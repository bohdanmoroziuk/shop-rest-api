const jwt = require('jsonwebtoken');

const getToken = req => {
  return req.headers.authorization.split(' ')[1];
};

const checkAuth = (req, res, next) => {
  try {
    const token = getToken();
    const decoded = jwt.decode(token, process.env.JWT_SECRET_KEY);

    req.userData = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Auth failed'
    });
  }
};

module.exports = checkAuth;