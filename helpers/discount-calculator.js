const { CouponTypes } = require("./constants");

const discountCalculator = (couponDetails, totalCartAmount) => {
  const { couponType, discountAmount, discountPercentage } = couponDetails;
  let discount = 0;

  // Flat discount - deduct predefined discount amount from total cart amount
  if (couponType === CouponTypes.FLAT_DISCOUNT) discount = discountAmount;
  // Percentage discount - deduct percentage upto predefined maximum discount amount
  else if (couponType === CouponTypes.PERCENTAGE_DISCOUNT) {
    const percentageDiscountAmount =
      (discountPercentage / 100) * totalCartAmount;

    discount =
      percentageDiscountAmount >= discountAmount
        ? discountAmount
        : percentageDiscountAmount;
  }

  return {
    isValid: true,
    discountAmount: parseFloat(discount.toFixed(2))
  };
};
module.exports = { discountCalculator };
