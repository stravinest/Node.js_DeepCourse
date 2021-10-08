const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { Post, Comment } = require('../models');
const router = express.Router();

//개시글 생성
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { password, content } = req.body;

    const { nickname } = res.locals.user;

    await Post.create({ nickname, password, content });
    res.send({ result: '게시글을 생성하였습니다.' });
  } catch (error) {
    console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    res.status(400).send();
  }
});

//댓글 생성
router.post('/comment/:postId', authMiddleware, async (req, res) => {
  try {
    const { comment } = req.body;
    const postId = req.params.postId;
    const { nickname } = res.locals.user;

    await Comment.create({ postId, nickname, comment });
    res.send({ result: '댓글을 생성하였습니다.' });
  } catch (error) {
    console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    res.status(400).send(error);
  }
});

//게시글 수정
router.put('/comment/modify/:id', authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const comment = req.body['comment'];
    console.log(id);
    console.log(comment);
    const result = await Comment.update(
      {
        comment: comment,
      },
      {
        where: { id: id },
      }
    );
    console.log(result);
    res.send({ result: '게시글을 수정하였습니다.' });
  } catch (error) {
    console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    res.status(400).send();
  }
});

// 댓글 삭제
router.delete('/comment/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;

    await Comment.destroy({ where: { id: id } });
    res.send({ result: '게시글을 삭제하였습니다.' });
  } catch (error) {
    console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    res.status(400).send();
  }
});

module.exports = router;
