const CouponTypes = {
  FLAT_DISCOUNT: 1,
  PERCENTAGE_DISCOUNT: 2
};

const okResponse = msg => ({
  statusCode: 200,
  body: msg
});

const createResponse = msg => ({
  statusCode: 201,
  body: msg
});

const badRequestResponse = msg => ({
  statusCode: 400,
  body: msg
});

const resourceNotFound = msg => ({
  statusCode: 404,
  body: msg
});

const internalServerError = msg => ({
  statusCode: 500,
  body: msg
});

module.exports = {
  CouponTypes,
  okResponse,
  createResponse,
  badRequestResponse,
  resourceNotFound,
  internalServerError
};
