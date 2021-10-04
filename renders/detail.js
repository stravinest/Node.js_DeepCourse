const express = require('express');
const {Post} = require('../models');
const router = express.Router();

// 게시글 조회 페이지
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const isExist = await Post.findOne({
      where: {
        id: Number(id),
      },
    });
    const result = {
      id: isExist['id'],
      nickname: isExist['nickname'],
      content: isExist['content'],
      createdAt: isExist['createdAt'],
    };
    console.log(result);
    res.render('detail', result);
  } catch (error) {
    console.log(
      `${req.method} ${req.originalUrl} : 데이터가 존재하지 않습니다.`
    );
    res.render('err');
    return;
  }
});

module.exports = router;
