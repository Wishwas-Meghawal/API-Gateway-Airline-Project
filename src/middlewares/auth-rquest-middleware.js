const { StatusCodes } = require('http-status-codes');

const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

const {UserService} = require('../services');
const { response } = require('express');

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


async function checkAuth(req, res, next){
  try {
    const response = await UserService.isAuthenticated(req.headers['x-access-token']);
    if(response){
      req.user = response; // setting the user id in the request object
      next();
    }
  } catch (error) {
    return res
    .status(error.statusCode)
    .json(error);
  }
}

module.exports = { 
  validateAuthRequest,
  checkAuth,
};