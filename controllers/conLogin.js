const jwt = require('jsonwebtoken');
const { User } = require('../models');
//로그인
exports.authValidation = async (req, res) => {
  try {
    const { nickname, password } = req.body;

    const user = await User.findOne({
      where: {
        nickname,
      },
    });

    if (!user || password !== user.password) {
      res.status(400).send({
        errorMessage: '이메일또는 패스워드가 틀렸습니다.',
      });
      return;
    }
    res.send({
      token: jwt.sign({ id: user.id }, process.env.SECRET_KEY),
    });
  } catch (error) {
    console.log(`${req.method}실패인가 ${req.originalUrl} : ${error.message}`);
    res.status(400).send();
  }
};
