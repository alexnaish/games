const pino = require('pino');

module.exports = {
  wrapper: ({ handler }) => (event, context) => {

    const logger = pino({
      traceId: process.env._X_AMZN_TRACE_ID,
      awsRequestId: context.awsRequestId
    });

    return handler(event, context, { logger });
  }
};
