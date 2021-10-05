const express = require('express');
const loginMiddleware = require('../middlewares/login-middleware');
const { Post, Comment } = require('../models');
const router = express.Router();

// 모든 게시글 데이터를 반환하는 함수
router.get('/', loginMiddleware, async (req, res) => {
  try {
    const jsonData = await Post.findAll({ order: [['createdAt', 'DESC']] });

    res.send({ result: jsonData });
  } catch (error) {
    console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    res.status(400).send();
  }
});
// 비로그인시 모든 게시글 데이터를 반환하는 함수
router.get('/not_login', async (req, res) => {
  try {
    const jsonData = await Post.findAll({ order: [['createdAt', 'DESC']] });

    res.send({ result: jsonData });
  } catch (error) {
    console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    res.status(400).send();
  }
});

//댓글 뿌려주기
router.get('/comment/:postId', loginMiddleware, async (req, res) => {
  try {
    const {postId} = req.params;
    console.log(postId)
    const jsonData = await Comment.findAll({
      where:{postId},
      order: [['createdAt', 'ASC']],
    });
    console.log(postId)
    const { nickname } = res.locals.user;
    res.send({ result: jsonData, nickname: nickname });
  } catch (error) {
    console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    res.status(400).send();
  }
});
//비로그인시 댓글 뿌려주기
router.get('/not_login_comment/:postId', async (req, res) => {
  try {
    const {postId} = req.params;
    const jsonData = await Comment.findAll({
      where:{postId},
      order: [['createdAt', 'ASC']],
    });
    res.send({ result: jsonData });
  } catch (error) {
    console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    res.status(400).send();
  }
});

module.exports = router;
