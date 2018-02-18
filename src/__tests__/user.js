import axios from 'axios';
import bcryptjs from 'bcryptjs';
// import mongoose from 'mongoose';
// import dbConfig from '../config/db';
import app from '../app';
// import User from '../models';

const request = axios.create({
  baseURL: 'http://localhost:3000',
});

describe('create new user', () => {
  test('should be able to create new user and return its data', async () => {
    console.warn(app.get('port'));

    const hash = bcryptjs.hashSync('password', 10);
    const testData = {
      email: 'test@gmail.com',
      username: 'test',
      password: hash,
    };
    try {
      const response = await request.post('/api/user', testData);
      expect(response.data.username.resolves.toBe('test')).assertions(1);
    } catch (error) {}
  });
});

describe('delete a user', () => {
  // test('should be able to delete user based on username', async () => {
  // try {
  //     const deleteRes = await request.delete('/api/user?username=test');
  //     return expect(deleteRes.meta.msg.resolves.toBe('sss'));
  //   } catch (error) {}
  // });
  test("should return 400 Bad Request if username didn't found on database", async () => {
    try {
      const deleteRes = await request.delete('/api/user/?username=ga-ada-di-database');
      expect(deleteRes.meta.msg.rejects.toBe('data not found')).assertions(1);
    } catch (error) {}
  });
  test("should return 400 Bad Request if req.query.username didn't exist", async () => {
    try {
      const deleteRes = await request.delete('/api/user/');
      expect(deleteRes.meta.msg.rejects.toBe('you must specify username query')).assertions(1);
    } catch (error) {}
  });
});
