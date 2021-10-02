const express = require('express');
const router = express.Router();

// 게시판 조회페이지
router.get('/', (request, res) => {
  res.render("board");
});

// 에러페이지
router.get('/err', (req, res) => {
  res.render('err');
});

module.exports = router;
