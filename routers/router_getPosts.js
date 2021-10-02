const express = require('express');
const loginMiddleware = require('../middlewares/login-middleware');
const { Post } = require('../models');
const router = express.Router();

// 모든 게시글 데이터를 반환하는 함수
router.get('/',loginMiddleware, async (req, res) => {
  try {
    let jsonData = await Post.findAll();
   
    res.send({ result: jsonData });
  } catch (error) {
    console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    res.status(400).send();
  }
});

module.exports = router;
