const express = require('express');

const mainRouter = require('./main');
// const viewRouter = require("./view");
// const modifyRouter = require("./modify");
// const writeRouter = require('./write.js');

const router = express.Router();

router.use('/', mainRouter); // ./main 실행
// router.use("/view", viewRouter);
// router.use("/write", writeRouter);
// router.use("/modify", modifyRouter);

module.exports = router;
