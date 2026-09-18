const { StatusCodes } = require('http-status-codes');

const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateAuthRequest(req, res, next) {
  if (!req.body.email) {
    ErrorResponse.message = 'Something went wrong while validating the request';
    ErrorResponse.error = new AppError(['Missing mandatory email field in the request'], StatusCodes.BAD_REQUEST);
    return res
    .status(StatusCodes.BAD_REQUEST)
    .json(ErrorResponse);
  }
  else if (!req.body.password) {
    ErrorResponse.message = 'Something went wrong while validating the request';
    ErrorResponse.error = new AppError(['Missing mandatory password field in the request'], StatusCodes.BAD_REQUEST);
    return res
    .status(StatusCodes.BAD_REQUEST)
    .json(ErrorResponse);
  }
  next();
}

module.exports = { 
  validateAuthRequest
};