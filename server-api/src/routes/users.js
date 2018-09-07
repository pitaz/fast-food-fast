import express from 'express';
import usersController from '../controllers/usersController';
import validateReq from '../validations/validateRequests';


const router = express.Router();
router.use(express.json());

router.post('/auth/signup', validateReq.validateNewUser, usersController.createUser);
router.post('/auth/login', validateReq.validateLoginUser, validateReq.checkLogin, usersController.login);

export default router;
