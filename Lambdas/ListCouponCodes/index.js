const { DYNAMODB } = process.env;
const { listItems } = require("../helpers/ddb-helpers");
const {
  resourceNotFound,
  okResponse,
  internalServerError
} = require("../helpers/constants");

exports.handler = async () => {
  const params = {
    TableName: DYNAMODB
  };

  try {
    const data = await listItems(params);

    if (!data.Items || !data.Items.length) {
      return resourceNotFound("Requested data not found");
    }

    return okResponse(data.Items);
  } catch (err) {
    return internalServerError(err);
  }
};
