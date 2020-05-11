const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SALT = 7;
const SECRET = "9BB7F6159647BCF42D4CEE814A86AA74"

module.exports = {
  generateToken: (user) => {
    if (!user) return null;

    return jwt.sign({ user }, SECRET, {
      expiresIn: '1h'
    });
  },
  hashPasswordAsync: async (password) => {
    return bcrypt.hashSync(password, SALT);
  },
  checkPasswordAsync: async (password, hash) => {
    return bcrypt.compareSync(password, hash);
  },
  verifyToken: async (req) => {
    const token = req.headers.authorization.replace('Bearer ', '') || '';
    const operation = req.body.operationName;

    try {
      if ((operation === 'authenticate' || operation === 'register') ||
        jwt.verify(token, SECRET)) {
        return;
      }
    } catch (error) {
      throw AuthenticationError('Authentication denied')
    }
  }
};
