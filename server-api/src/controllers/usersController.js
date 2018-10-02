/* eslint-disable class-methods-use-this */
import bcrypt from 'bcryptjs';
import db from '../db/dbConnection';


class UsersControllers {
  createNewUser(req, res) {
    const { body } = req;
    const name = body.name.trim();
    const email = body.email.trim();
    const role = body.role.trim();
    const password = bcrypt.hashSync(body.password.trim(), 10);

    const checkEmailQuery = 'SELECT email FROM users WHERE email = $1';
    const emailValue = [email];
    const registerUser = 'INSERT INTO users(name, email, role, password) VALUES($1, $2, $3, $4) RETURNING *';
    const values = [name, email, role, password];

    db.connect()
      .then((client) => {
        client.query(checkEmailQuery, emailValue)
          .then((response) => {
            if (response.rows[0]) {
              client.release();
              return res.status(409).json({
                message: 'Email already exist!'
              });
            }
            client.query(registerUser, values)
              .then((user) => {
                client.release();
                return res.status(201).json({
                  message: 'User created successfully!',
                  data: {
                    name: user.rows[0].name,
                    email: user.rows[0].email,
                    role: user.rows[0].role
                  }
                });
              })
              .catch(() => {
                client.release();
                return res.status(500).json({
                  message: 'server error'
                });
              });
          })
          .catch(() => {
            client.release();
            return res.status(500).json({
              message: 'Internal server error'
            });
          });
      })
      .catch(err => res.status(500).json({
        message: err
      }));
  }

  login(req, res) {
    return res.status(200).json({ message: 'user login successful!' });
  }
}

const usersControllers = new UsersControllers();
export default usersControllers;
