const { DYNAMODB } = process.env;
const ULID = require("ulid");
const { createItem } = require("../helpers/ddb-helpers");
const {
  badRequestResponse,
  createResponse,
  internalServerError
} = require("../helpers/constants");
const { createCouponCodeValidation } = require("../helpers/validations");

exports.handler = async event => {
  console.log("Event-", event);

  // create coupon code validations
  const validationResult = createCouponCodeValidation(event);
  if (validationResult.length) return badRequestResponse(validationResult);

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
    return createResponse(params.Item);
  } catch (err) {
    return internalServerError(err);
  }
};
