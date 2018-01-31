export default class ResponseBuilder {
  /**
   * @apiDefine ResponseBuilder Class Response Builder a response builder
   */
  constructor() {
    this.meta = {
      msg: 'operation success',
      ok: true,
    };
    this.data = {};
  }

  /**
   * @apiName data setter
   * @apiParam {Object} data
   */
  setData(data) {
    this.data = data;
    return this;
  }

  /**
   * @apiName ok setter
   * @apiParam {Boolean} ok set if operation success or failed
   */
  setOk(ok) {
    this.meta.ok = ok;
    return this;
  }

  /**
   * @apiName msg setter
   * @apiParam {String} msg set a custom message
   */
  setMsg(msg) {
    this.meta.msg = msg;
    return this;
  }

  /**
   * @apiName build the response using this method
   *
   */
  build() {
    return {
      meta: this.meta,
      data: this.data,
    };
  }
}
