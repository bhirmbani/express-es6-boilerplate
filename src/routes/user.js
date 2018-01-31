import express from 'express';
import userController from '../controllers';

const router = express.Router();

router.get('/', (req, res) => {
  userController.get(req, res);
});

router.post('/', (req, res) => {
  userController.create(req, res);
});

export default router;
