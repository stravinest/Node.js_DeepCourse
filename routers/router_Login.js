const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const router = express.Router();

//로그인
router.post('/', async (req, res) => {
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
    res.status(40).send();
  }
});

module.exports = router;
