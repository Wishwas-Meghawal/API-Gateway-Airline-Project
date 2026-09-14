//const { where } = require('sequelize');
const { Logger } = require('../config');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {

    const response = await this.model.create(data);
    return response;

  }
  async destroy(data) {

    const response = await this.model.destroy({
      where: {
        id: data
      }
    });
    if (!response) {
      throw new AppError('Not able to find the resourse', StatusCodes.NOT_FOUND);
    }
    return response;
  }
  async get(data) {
    const response = await this.model.findByPk(data);
    if (!response) {
      throw new AppError('Not able to fetch data of all the airplanes', StatusCodes.NOT_FOUND);
    }
    return response;
  }
  async getAll() {
    const response = await this.model.findAll();

    return response;
  }

  async update(id, data) { // data --> {col, value...}
    const response = await this.model.update(data, {
      where: {
        id: id
      }
    });
    // response[0] = affected rows
    if (response[0] === 0) {
      throw new AppError(
        'Airplane not found',
        StatusCodes.NOT_FOUND
      );
    }

    return await this.model.findByPk(id);
  }
}


module.exports = CrudRepository;