const express = require('express');
const router = express.Router();
const { validation } = require('../controllers/conUser');
// 회원가입
router.post('/', validation);

module.exports = router;
