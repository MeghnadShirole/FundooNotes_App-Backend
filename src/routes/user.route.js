import express from 'express';
import * as userController from '../controllers/user.controller';

const router = express.Router();

router.post('/registration', userController.registration)

export default router;