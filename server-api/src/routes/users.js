/* eslint-disable class-methods-use-this */
import usersController from '../controllers/usersController';
import validateReq from '../validations/validateRequests';

class Users {
  users(router) {
    router.post('/api/v1/auth/signup', validateReq.validateNewUser, usersController.createUser);
    router.post('/api/v1/auth/login', validateReq.validateLoginUser, validateReq.checkLogin, usersController.login);
  }
}

const users = new Users();
export default users;
