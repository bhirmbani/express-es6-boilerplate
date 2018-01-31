import { UserService } from '../services';

export default class UserController {
  constructor() {
    this.service = new UserService();
  }

  async get(req, res) {
    try {
      const response = await this.service.findAll({}, null, null, 'createdAt');
      res.json({ response });
    } catch (error) {
      res.json({ error });
    }
  }

  async create(req, res) {
    const { username, password, email } = req.body;
    try {
      const data = {
        username,
        password,
        email,
      };
      const response = await this.service.create(data);
      res.json({ response });
    } catch (error) {
      res.json({ error });
    }
  }
}
