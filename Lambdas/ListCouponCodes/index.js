const { DYNAMODB } = process.env;

const { listItems } = require("../ddb-helpers");

exports.handler = async () => {
  const params = {
    TableName: DYNAMODB
  };

  try {
    const data = await listItems(params);

    if (!data.Items || !data.Items.length) {
      return {
        statusCode: 404,
        body: "Requested data not found"
      };
    }

    return {
      statusCode: 200,
      body: data.Items
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err
    };
  }
};
