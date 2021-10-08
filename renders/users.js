const express = require('express');
const router = express.Router();

// 회원가입페이지
router.get('/', (request, res) => {
  res.render('users');
});

// 에러페이지
router.get('/err', (req, res) => {
  res.render('err');
});

module.exports = router;
