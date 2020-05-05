const { client } = require('../helpers/dynamodb');
const { generateGatewayClient } = require('../helpers/apigateway');

module.exports = async (event, connectionId) => {
  const foundConnection = await client.get({
    TableName: 'connections',
    Key: { connectionId }
  });

  if (foundConnection) {
    await client.delete({
      TableName: 'connections',
      Key: { connectionId }
    });

    const updatedRoom = await client.update({
      TableName: 'rooms',
      Key: { room: foundConnection.room },
      UpdateExpression: "DELETE connections :connectionId",
      ExpressionAttributeValues: {
        ":connectionId": client.createSet([connectionId]),
      },
      ReturnValues: 'ALL_NEW'
    });

    const gatewayClient = generateGatewayClient(event);
    await gatewayClient.postToConnection({
      ConnectionId: updatedRoom.connectionId, Data: { event: 'ROOM_DISCONNECT', payload: { user: foundConnection } }
    })

  }

  console.log('cleaned up!', connectionId);
}
