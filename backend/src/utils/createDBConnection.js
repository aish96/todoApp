var AWS = require("aws-sdk");
AWS.config.update({ region: "ap-south-1" });

const documentClient = new AWS.DynamoDB.DocumentClient();
module.exports = documentClient;
