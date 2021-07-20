const mongoose = require('mongoose');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  console.log(err);
  const errorObject = {};
  errorObject.success = false;
  errorObject.code = 1; // 1 means fail
  errorObject.msg = 'Fail';
  res.locals.errorMessage = err.message;
  statusCode = err.status ? err.status : 500;
  res.status(statusCode).send(errorObject);
};

module.exports = {
  errorConverter,
  errorHandler,
};
