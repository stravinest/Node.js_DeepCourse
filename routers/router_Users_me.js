const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/login-middleware');

router.get('/', authMiddleware, async (req, res) => {
  const { user } = res.locals;
  res.send({
    user,
  });
});

module.exports = router;
