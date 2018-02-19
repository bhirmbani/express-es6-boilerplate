// @flow
import BaseService from './baseService';
import User from '../models';

export default class UserService extends BaseService {
  constructor() {
    super(User);
  }
}
