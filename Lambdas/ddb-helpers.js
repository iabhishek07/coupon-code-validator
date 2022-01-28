// eslint-disable-next-line import/no-extraneous-dependencies
const AWS = require("aws-sdk");

const ddb = new AWS.DynamoDB.DocumentClient();

// function to create item in dynamodb table
async function createItem(params) {
  try {
    return ddb.put(params).promise();
  } catch (err) {
    return err;
  }
}

async function getItem(params) {
  try {
    return ddb.get(params).promise();
  } catch (err) {
    return err;
  }
}

async function listItems(params) {
  try {
    return ddb.scan(params).promise();
  } catch (err) {
    return err;
  }
}

module.exports = {
  createItem,
  getItem,
  listItems
};
