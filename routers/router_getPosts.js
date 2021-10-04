const express = require('express');
const loginMiddleware = require('../middlewares/login-middleware');
const { Post, Comment } = require('../models');
const router = express.Router();

// 모든 게시글 데이터를 반환하는 함수
router.get('/', loginMiddleware, async (req, res) => {
  try {
    let jsonData = await Post.findAll({order:[['createdAt','DESC']]});

    res.send({ result: jsonData });
  } catch (error) {
    console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    res.status(400).send();
  }
});
// 비로그인시 모든 게시글 데이터를 반환하는 함수
router.get('/not_login', async (req, res) => {
  try {
    let jsonData = await Post.findAll({order:[['createdAt','DESC']]});

    res.send({ result: jsonData });
  } catch (error) {
    console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    res.status(400).send();
  }
});

//댓글 뿌려주기
router.get('/comment', loginMiddleware, async (req, res) => {
  try {
    let jsonData = await Comment.findAll({order:[['createdAt','DESC']]});
    //const { nickname } = res.locals.user;
    res.send({ result: jsonData });
  } catch (error) {
    console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    res.status(400).send();
  }
});
//비로그인시 댓글 뿌려주기
router.get('/not_login_comment', async (req, res) => {
  try {
    let jsonData = await Comment.findAll({order:[['createdAt','DESC']]});

    res.send({ result: jsonData });
  } catch (error) {
    console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    res.status(400).send();
  }
});

module.exports = router;
