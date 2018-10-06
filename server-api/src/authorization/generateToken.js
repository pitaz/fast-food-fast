import jwt from 'jsonwebtoken';

class GenerateToken {
  static token(user, secret) {
    const token = jwt.sign(
      user, secret,
      { expiresIn: '1d' }
    );

    return token;
  }
}

export default GenerateToken;
