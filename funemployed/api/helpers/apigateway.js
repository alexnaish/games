const AWS = require('aws-sdk');
const { onAws } = require('./aws');

const apiVersion = "2018-11-29";

const generateCredentials = !onAws ? () => ({
  apiVersion,
  endpoint: 'http://localhost:3001',
  accessKeyId: 'DEFAULT_ACCESS_KEY',
  secretAccessKey: 'DEFAULT_SECRET',
}) : (event) => ({
  apiVersion,
  endpoint: event.requestContext.domainName + "/" + event.requestContext.stage
});

module.exports = {
  generateGatewayClient: (event) => {
    const credentials = generateCredentials(event);
    const client = new AWS.ApiGatewayManagementApi(credentials);
    return {
      postToConnection: ({ ConnectionId, Data }) => client.postToConnection({
        ConnectionId, Data: JSON.stringify(Data)
      }).promise()
    }
  }
};
