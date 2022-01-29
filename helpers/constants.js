const CouponTypes = {
  FLAT_DISCOUNT: 1,
  PERCENTAGE_DISCOUNT: 2
};

const okResponse = msg => ({
  statusCode: 200,
  body: JSON.stringify(msg)
});

const createResponse = msg => ({
  statusCode: 201,
  body: JSON.stringify(msg)
});

const badRequestResponse = msg => ({
  statusCode: 400,
  body: JSON.stringify(msg)
});

const resourceNotFound = msg => ({
  statusCode: 404,
  body: JSON.stringify(msg)
});

const internalServerError = msg => ({
  statusCode: 500,
  body: JSON.stringify(msg)
});

module.exports = {
  CouponTypes,
  okResponse,
  createResponse,
  badRequestResponse,
  resourceNotFound,
  internalServerError
};
