// @flow
import bcryptjs from 'bcryptjs';
import HTTPStatus from 'http-status';
import { ResponseBuilder } from '../helpers';
import { UserService } from '../services';

interface Methods {
  get(req: Object, res: Object): Promise<any>;
  create(req: Object, res: Object): Promise<any>;
}

export default class UserController implements Methods {
  service: Object;
  constructor() {
    this.service = new UserService();
  }

  async get(req: Object, res: Object) {
    try {
      const response = await this.service.findAll({}, null, null, 'createdAt');
      res.status(HTTPStatus.OK).json(new ResponseBuilder().setData(response).build());
    } catch (error) {
      res.status(HTTPStatus.BAD_REQUEST).json(new ResponseBuilder()
        .setMsg(error)
        .setOk(false)
        .build());
    }
  }

  async create(req: Object, res: Object) {
    const { username, password, email } = req.body;
    const hash = bcryptjs.hashSync(password, 10);
    try {
      const data = {
        username,
        password: hash,
        email,
      };
      const response = await this.service.create(data);
      res.status(HTTPStatus.CREATED).json(new ResponseBuilder().setData(response).build());
    } catch (error) {
      res.status(HTTPStatus.BAD_REQUEST).json(new ResponseBuilder()
        .setMsg(error)
        .setOk(false)
        .build());
    }
  }

  async delete(req: Object, res: Object) {
    const { username } = req.query;
    try {
      if (username === undefined) {
        res.status(HTTPStatus.BAD_REQUEST).json(new ResponseBuilder()
          .setMsg('you must specify username query')
          .setOk(false)
          .build());
      }
      const response = await this.service.delete({ username });
      res.status(HTTPStatus.OK).json(new ResponseBuilder().setData(response).build());
    } catch (error) {
      res.status(HTTPStatus.BAD_REQUEST).json(new ResponseBuilder()
        .setMsg(error)
        .setOk(false)
        .build());
    }
  }
}
