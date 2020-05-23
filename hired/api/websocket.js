const { wrapper } = require('./helpers/lambda');
const connectionHandler = require('./modules/connection');
const cleanHandler = require('./modules/clean');
const startGameHandler = require('./modules/start');

const SUCCESS = { statusCode: 200 };

const handler = async function (event, context, { logger }) {
  const { requestContext } = event;
  const { connectionId, routeKey } = requestContext;

  switch (routeKey) {
    case '$connect':
      return await connectionHandler(event).then(() => SUCCESS);
    case '$disconnect':
      return await cleanHandler(event, connectionId).then(() => SUCCESS);
    case 'start':
      return await startGameHandler(event).then(() => SUCCESS);
    case '$default':
    default:
      logger.error('default route hit', requestContext);
  }

  // Return a 200 status to tell API Gateway the message was processed
  // successfully.
  // Otherwise, API Gateway will return a 500 to the client.
}


module.exports.handler = wrapper({ handler })
