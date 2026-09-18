const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {ServerConfig} = require('../../config');

function checkPassword(plinPassword, encryptedPassword){
  try {
    return bcrypt.compareSync(plinPassword, encryptedPassword);
  } catch (error) {
    throw error;
  }
}

function createToken(input){
  try {
    return jwt.sign(input, ServerConfig.JWT_SECRET,{expiresIn: ServerConfig.JWT_EXPIRY});;
  } catch (error) {
    console.log('Error in creating token', error);
    throw error;
  }
}

module.exports = {
  checkPassword,
  createToken
}