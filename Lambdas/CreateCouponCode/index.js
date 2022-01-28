const ULID = require("ulid");

const { DYNAMODB } = process.env;
const { createItem } = require("../ddb-helpers");

exports.handler = async event => {
  console.log("Event-", event);
  /*
   Add validation for if coupon type is 1 then discountAmount is mandatory & if coupon type is 2 then discount percentage is mandatory,
   add validation for other mandatory fields
   add validation for coupon type should be either 1 or 2
  */
  const couponId = ULID.ulid();
  const params = {
    TableName: DYNAMODB,
    Item: {
      couponId,
      ...event
    }
  };

  try {
    await createItem(params);
    return {
      statusCode: 201,
      body: params.Item
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err
    };
  }
};
