const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
  try {
    const jsonwebtoken = req.headers.authorization;
    const decode = jwt.verify(jsonwebtoken, process.env.JWT_SECRET);
    req.userId = decode.userId;
    next();
  } catch (err) {
    await res.status(401).json({ message: 'Invalid Access Token!' });
    next(err);
  }
};

module.exports = {
  validateToken,
};
