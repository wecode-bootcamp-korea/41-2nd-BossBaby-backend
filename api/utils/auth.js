const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
  try {
    const jsonwebtoken = req.headers.authorization;
    const decode = jwt.verify(jsonwebtoken, process.env.JWT_SECRETKEY);
    req.userId = decode.userId;
    next();
  } catch (err) {
    await res.status(401).json({ message: 'Invalid Access Token!' });
    next(err);
  }
};

const validateTokenForPublic = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (token == 'null' || token == undefined) {
      next();
      return;
    }
    const jwtVerify = jwt.verify(token, process.env.JWT_SECRETKEY);

    req.userId = jwtVerify;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Invalid Access Token' });
    next(err);
  }
};

module.exports = {
  validateToken,
  validateTokenForPublic,
};
