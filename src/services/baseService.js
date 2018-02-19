// @flow
export default class BaseService {
  /**
   * @apiDefine BaseService Class Base Service a class that include common and shared operation
   * @apiParam {Model} model a mongoose model
   */
  model: Object;
  constructor(model: Object) {
    this.model = model;
  }

  /**
   * @apiName Get all rows
   * @api {get} / get all
   * @apiDescription pass each params in order. if not required MUST pass null
   * @apiParam {Object} condition optional a condition params from Model.find on mongoose
   * @apiParam {Object} projection optional projection params from Model.find on mongoose
   * @apiParam {Object} options optional an options params from Model.find on mongoose
   * @apiParam {String} sort required an options params from Model.find on mongoose
   */
  async findAll(
    condition: Object = {},
    projection: ?Object = null,
    options: ?Object = null,
    sort: string,
  ) {
    try {
      const response = await this.model.find(condition, projection, options).sort(sort);
      if (response) {
        return response;
      }
      throw Error('fail to find all data');
    } catch (error) {
      throw error.message;
    }
  }

  /**
   * @apiName Create one row
   * @api {post} / create
   * @apiParam {Object} required an object with data needed to create one row
   */
  async create(payload: Object) {
    try {
      const response = await this.model.create(payload);
      if (response) {
        return response;
      }
      throw Error('fail to insert data');
    } catch (error) {
      throw Error(error.message);
    }
  }

  /**
   * @apiName Delete one row
   * @api {delete} /?username= username
   * @apiParam  {Object} condition required
   * a condition params from Model.findOneAndRemove on mongoose
   */
  async delete(condition: Object) {
    try {
      const response = await this.model.findOneAndRemove(condition);
      if (response) {
        return response;
      }
      throw Error('data not found');
    } catch (error) {
      throw error.message;
    }
  }
}
