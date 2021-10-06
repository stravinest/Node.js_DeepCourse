const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const [tokenType, tokenValue] = authorization.split(' ');

  if (tokenType !== 'Bearer') {
    res.status(401).send({
      errorMessage: '로그인후 사용하세요',
    });
    return;
  }
  try {
    const { id } = jwt.verify(tokenValue, process.env.SECRET_KEY);
    User.findByPk(id).then((user) => {
      res.locals.user = user; // 미들웨어를 사용하는곳 어디에서든 사용할수 있어서 매우 편리하다
      next();
    });
  } catch (error) {
    res.status(401).send({
      errorMessage: '로그인 후 사용하세요',
    });
    return;
  }
};
