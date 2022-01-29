const { badRequestResponse, CouponTypes } = require("./constants");

/**
 * Function to validate mandatory fields for creating a coupon code
 * 1. CouponType validation
 * 2. Other mandatory/dependent fields
 * @param {Object} data Event object
 * @return [Errors] If any validation errors
 */
const createCouponCodeValidation = data => {
  const validationErrors = [];

  const mandatoryFields = [
    "couponName",
    "couponCode",
    "couponType",
    "discountAmount",
    "minimumCartAmountToApply",
    "couponValidFrom",
    "couponValidUpto"
  ];

  // if coupon type is percentage discount then discountPercentage field is mandatory
  if (
    "couponType" in data &&
    data.couponType === CouponTypes.PERCENTAGE_DISCOUNT
  )
    mandatoryFields.push(`discountPercentage`);

  // if any of the mandatory fields is missing then add it into errors array
  const missingFields = mandatoryFields.filter(
    field => !Object.keys(data).includes(field) || !data[field]
  );

  if (missingFields.length)
    validationErrors.push(
      `Following mandatory parameters are missing: ${missingFields.join()}`
    );

  // coupon type should either be 1 or 2
  if (
    "couponType" in data &&
    !Object.values(CouponTypes).includes(data.couponType)
  )
    validationErrors.push(`Invalid Coupon type is provided`);

  return validationErrors;
};

/**
 * Function to perform the following validations
 * 1. Validate coupon code expiry
 * 2. Validate minimum cart value to avail coupon
 * @param {Object} couponDetails Coupon Information
 * @param {Number} totalCartAmount Total cart amount
 * @return {boolean|{body, statusCode: number}}
 */
const validateCouponCode = (couponDetails, totalCartAmount) => {
  const {
    minimumCartAmountToApply,
    couponValidUpto: couponCodeValidUpto
  } = couponDetails;

  const currentTimeStamp = new Date(new Date().toISOString());
  const couponValidUpto = new Date(couponCodeValidUpto);

  if (currentTimeStamp > couponValidUpto)
    return badRequestResponse(
      `Invalid Coupon Code - Coupon code is expired on ${couponValidUpto}`
    );

  if (totalCartAmount < minimumCartAmountToApply)
    return badRequestResponse(
      `Invalid Coupon Code - Minimum cart value for availing this coupon is RS.${minimumCartAmountToApply}`
    );

  return true;
};

module.exports = { validateCouponCode, createCouponCodeValidation };
