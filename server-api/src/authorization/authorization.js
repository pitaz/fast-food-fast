/* eslint-disable class-methods-use-this, consistent-return */
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const secret = process.env.JWT_SECRET;

class Authorization {
  static user(request, response, next) {
    const token = request.headers['x-access-token']
    || request.body.token
    || request.query.token;

    if (token) {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return response.status(401).json({
            message: 'Invalid credentials supplied',
          });
        }
        request.decoded = decoded;
        return next();
      });
    } else {
      return response.status(401).json({
        message: 'provide token'
      });
    }
  }


  static admin(request, response, next) {
    if (request.decoded.role === 'admin') {
      next();
    } else {
      response.status(403).json({
        message: 'Only available to admin',
      });
    }
  }
}

export default Authorization;
