const { wrapper } = require('./helpers/lambda');

const handler = async function (event, context, { logger }) {
	logger.info(event);
	logger.info(context);
};

module.exports.handler = wrapper({ handler })
