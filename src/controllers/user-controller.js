const { StatusCodes } = require('http-status-codes');
const { UserService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');


/**
 * POST :/signup
 * req-body : {email: 'abc@example.com',  password: 'password123'}
 */

async function signup(req, res) {
  console.log(req.body)
  try {
    const user = await UserService.create({
      email: req.body.email,
      password: req.body.password,
    });
    SuccessResponse.data = user;
    return res
      .status(StatusCodes.CREATED)
      .json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    ErrorResponse.message = error.explanation || error.message;
    
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}
async function signin(req, res) {
  console.log(req.body)
  try {
    const token = await UserService.signin({
      email: req.body.email,
      password: req.body.password,
    });
    SuccessResponse.data = token;
    return res
      .status(StatusCodes.CREATED)
      .json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    ErrorResponse.message = error.explanation || error.message;
    
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

module.exports={
  signup,
  signin,

}