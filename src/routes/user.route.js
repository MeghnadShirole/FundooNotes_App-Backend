import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { resetPasswordAuth } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/registration', newUserValidator, userController.registration)

router.post('/login', userController.login);

router.post('/forgetPassword', userController.forgetPassword);

router.post('/resetPassword/:token', resetPasswordAuth, userController.resetPassword);

export default router;