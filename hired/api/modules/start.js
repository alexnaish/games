const { client } = require('../helpers/dynamodb');
const { generateGatewayClient } = require('../helpers/apigateway');
const jobs = require('./data/jobs.json');
const qualifications = require('./data/qualifications.json');

const sortRandom = () => 0.5 - Math.random();
const qualificationCount = 4;

module.exports = async (event) => {
  const { body } = event;
  const payload = body ? JSON.parse(body).data : {};
  const { room } = payload;

  const existingRoom = await client.get({ TableName: 'rooms', Key: { room: room.toUpperCase() } });
  const gatewayClient = generateGatewayClient(event);

  if (existingRoom) {
    const [firstBoss, ...remainingPlayers] = existingRoom.connections.values.sort(sortRandom);
    const job = jobs.sort(sortRandom)[0];
    const randomQualifications = qualifications.sort(sortRandom);

    await gatewayClient.postToConnection({
      ConnectionId: existingRoom.connectionId,
      Data: { event: 'GAME_STARTING', payload: { firstBoss, job } }
    });

    await gatewayClient.postToConnection({
      ConnectionId: firstBoss,
      Data: { event: 'GAME_LEADER', payload: { job } }
    });

    await Promise.all([
      remainingPlayers.map((connection, i) => {
        const traits = randomQualifications.slice(i * qualificationCount, i * qualificationCount + (qualificationCount))
        return gatewayClient.postToConnection({
          ConnectionId: connection,
          Data: { event: 'GAME_APPLICANT', payload: { job, traits } }
        });
      })
    ]);
  }
}
