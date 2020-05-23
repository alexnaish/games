const { client } = require('../helpers/dynamodb');
const { generateGatewayClient } = require('../helpers/apigateway');

const createNewRoom = async (connectionId, ttl) => {
  const randomNumber = (Math.random() + 1) * 100000;
  const roomCode = randomNumber.toString(36).substr(0, 4).toUpperCase();
  await client.put({
    TableName: 'rooms',
    Item: { room: roomCode, connectionId, metadata: {}, ttl }
  });
  return roomCode;
};

const createNewUser = async (connectionId, name, room, ttl) => {
  const operations = {
    TransactItems: [{
      Put: {
        TableName: 'connections',
        Item: { connectionId, name, room, ttl }
      }
    }, {
      Update: {
        TableName: 'rooms',
        Key: { room: room },
        UpdateExpression: "ADD connections :connectionId",
        "ExpressionAttributeValues": {
          ":connectionId": client.createSet([connectionId]),
        }
      }
    }]
  };

  await client.transactWrite(operations);
}

module.exports = async (event) => {
  const { requestContext, queryStringParameters } = event;
  const { connectionId } = requestContext;
  const { operation, room, name } = queryStringParameters;
  const gatewayClient = generateGatewayClient(event);
  const ttl = parseInt((Date.now() / 1000) + 3600);

  switch (operation) {
    case 'creation': {
      const roomCode = await createNewRoom(connectionId, ttl);
      gatewayClient.postToConnection({
        ConnectionId: connectionId, Data: { event: 'ROOM_CREATION', payload: roomCode }
      });
      break;
    }
    case 'connect': {
      const upperCasedRoom = room.toUpperCase();
      const existingRoom = await client.get({ TableName: 'rooms', Key: { room: upperCasedRoom } });
      if (existingRoom) {
        await createNewUser(connectionId, name, room, ttl);
        await gatewayClient.postToConnection({
          ConnectionId: existingRoom.connectionId,
          Data: { event: 'ROOM_JOINED', payload: { user: { connectionId, name } } }
        });
      } else {
        throw new Error('Room not found');
      }
      break;
    }
    default:
      throw new Error('Unsupported operation')
  }
}
