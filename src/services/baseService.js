export default class BaseService {
  /**
   * @apiParam {Model} model a mongoose model
   */
  constructor(model) {
    this.model = model;
  }

  /**
   * @api {get} / get all
   * @apiDescription pass each params in order. if not required MUST pass null
   * @apiParam {Object} condition optional a condition params from Model.find on mongoose
   * @apiParam {Object} projection optional projection params from Model.find on mongoose
   * @apiParam {Object} options optional an options params from Model.find on mongoose
   * @apiParam {String} sort required an options params from Model.find on mongoose
   */
  async findAll(condition = {}, projection = null, options = null, sort) {
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
   * @api {post} / create
   * @apiParam  {Object} data object that include data
   */
  async create(payload) {
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
}
