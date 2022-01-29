const { DYNAMODB } = process.env;
const ULID = require("ulid");
const { createItem } = require("../helpers/ddb-helpers");
const {
  badRequestResponse,
  createResponse,
  internalServerError
} = require("../helpers/constants");
const { createCouponCodeValidation } = require("../helpers/validations");

module.exports.handler = async event => {
  console.log("Event-", event);
  const body = JSON.parse(event.body);

  // create coupon code validations
  const validationResult = createCouponCodeValidation(body);
  if (validationResult.length) return badRequestResponse(validationResult);

  const couponId = ULID.ulid();
  const params = {
    TableName: DYNAMODB,
    Item: {
      couponId,
      ...body
    }
  };

  try {
    await createItem(params);
    return createResponse(params.Item);
  } catch (err) {
    return internalServerError(err);
  }
};
