/* eslint-disable class-methods-use-this */
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import db from '../db/dbConnection';
import generateToken from '../authorization/generateToken';

dotenv.config();


class UsersControllers {
  createNewUser(req, res) {
    const { body } = req;
    const name = body.name.trim();
    const email = body.email.trim();
    const role = 'user';
    const password = bcrypt.hashSync(body.password.trim(), 10);

    const checkEmailQuery = 'SELECT email FROM users WHERE email = $1';
    const emailValue = [email];
    const registerUser = 'INSERT INTO users(name, email, role, password) VALUES($1, $2, $3, $4) RETURNING *';
    const values = [name, email, role, password];


    db.query(checkEmailQuery, emailValue)
      .then((response) => {
        if (response.rows[0]) {
          return res.status(409).json({
            message: 'Email already exist!'
          });
        }
        db.query(registerUser, values)
          .then((user) => {
            const authToken = generateToken.token(user.rows[0], process.env.JWT_SECRET);
            return res.status(201).json({
              status: 'success',
              message: 'User created successfully!',
              data: {
                id: user.rows[0].id,
                name: user.rows[0].name,
                email: user.rows[0].email,
                role: user.rows[0].role,
                token: authToken
              }
            });
          })
          .catch(() => res.status(500).json({
            status: 'fail',
            message: 'Internal server error',
          }));
      })
      .catch(() => res.status(500).json({
        message: 'Internal server error'
      }));
  }

  login(req, res) {
    const { body } = req;
    const loginEmail = body.email.trim();

    const checkUserQuery = 'SELECT * FROM users WHERE email = $1';
    const emailValue = [loginEmail];


    db.query(checkUserQuery, emailValue)
      .then((response) => {
        if (!response.rows[0]) {
          return res.status(409).json({
            message: 'User does not exist!'
          });
        }
        const checkPassword = bcrypt
          .compareSync(body.password.trim(), response.rows[0].password);
        if (!checkPassword) {
          return res.status(422).json({
            message: 'invalid credentials entered',
          });
        }

        const { id, role, email } = response.rows[0];

        const userToken = generateToken.token({
          id,
          role,
          email,
        }, process.env.JWT_SECRET);

        return res.status(200).json({
          message: 'Signed in successfully',
          data: {
            role: response.rows[0].role,
            email: response.rows[0].email,
            name: response.rows[0].name,
            token: userToken
          },
        });
      })
      .catch(() => res.status(500).json({
        message: 'Internal server error'
      }));
  }
}

const usersControllers = new UsersControllers();
export default usersControllers;
