/* eslint-disable class-methods-use-this */
import express from 'express';
import users from '../sampleData/usersStorage';

const router = express.Router();
router.use(express.json());

class UsersControllers {
  createUser(req, res) {
    const userExist = users.find(f => f.username === req.body.username);
    const emailExist = users.find(f => f.email === req.body.email);
    if (userExist || emailExist) return res.status(409).json({ error: 'User already exist' });

    const user = {
      id: users.length + 1,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      address: req.body.address,
      email: req.body.email,
      password: req.body.password
    };
    users.push(user);
    return res.status(201).json({ message: 'Account created' });
  }
}

const usersControllers = new UsersControllers();
export default usersControllers;
