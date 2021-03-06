const { DYNAMODB } = process.env;
const { listItems } = require("../helpers/ddb-helpers");
const { validateCouponCode } = require("../helpers/validations");
const { discountCalculator } = require("../helpers/discount-calculator");
const {
  badRequestResponse,
  okResponse,
  internalServerError
} = require("../helpers/constants");

exports.handler = async event => {
  console.log("Event-", event);
  const { couponCode, totalCartAmount } = event.queryStringParameters;

  if (!couponCode || !totalCartAmount)
    return badRequestResponse(
      `Either couponCode or totalCartAmount is missing`
    );

  try {
    const params = {
      TableName: DYNAMODB,
      FilterExpression: "couponCode = :couponCode",
      ExpressionAttributeValues: {
        ":couponCode": couponCode
      }
    };

    // Fetching coupon details of requested couponCode
    const response = await listItems(params);

    if (response.Items && !response.Items.length)
      return badRequestResponse(`Invalid coupon code - '${couponCode}'`);

    const couponDetails = response.Items[0];

    // Validate coupon code
    const couponValidation = validateCouponCode(couponDetails, totalCartAmount);
    if (couponValidation !== true) return couponValidation;

    // calculate discount
    const discountAmount = discountCalculator(couponDetails, totalCartAmount);

    return okResponse(discountAmount);
  } catch (err) {
    return internalServerError(err);
  }
};
