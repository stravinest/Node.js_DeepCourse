const express = require('express');
const loginMiddleware = require('../middlewares/login-middleware');
const { Post,Comment } = require('../models');
const router = express.Router();

//개시글 생성
router.post('/', loginMiddleware, async (req, res) => {
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
router.post('/comment', loginMiddleware, async (req, res) => {
  try {
    const { comment } = req.body;
   
    const { nickname } = res.locals.user;

    await Comment.create({ nickname, comment });
    res.send({ result: '댓글을 생성하였습니다.' });
  } catch (error) {
    console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    res.status(400).send();
  }
});

// // 모든 게시글 데이터를 반환하는 함수
// router.get("/", async (req, res) => {
//   try {
//       let jsonData = await Post.find().sort({createdAt: -1});
//       for (let x in jsonData) {
//           const createdAt = new Date(jsonData[x]["createdAt"]);
//           const create_date = `${createdAt.getFullYear()}-${
//               createdAt.getMonth() + 1
//           }-${createdAt.getDate()} ${createdAt.getHours()}:${createdAt.getMinutes()}:${createdAt.getSeconds()}`;
//           jsonData[x]["createdAt"] = create_date;
//       }
//       res.send({result: jsonData});
//   } catch (error) {
//       console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
//       res.status(400).send();
//   }
// });

// //게시글 수정
// router.put("/:_id", async (req, res) => {
//     try {
//         const _id = req.params._id;

//         const user = req.body["user"];
//         const password = req.body["password"];
//         const title = req.body["title"];
//         const content = req.body["content"];

//         const isExist = await Post.findOne({_id, password});
//         if (!isExist || !_id || !user || !password || !title || !content) {
//             console.log(`${req.method} ${req.originalUrl} : 일치하지 않는 비밀번호 입니다.`);
//             res.status(406).send();
//             return;
//         }
//         await Post.updateOne({_id}, {$set: {user, title, content}});
//         res.send({result: "게시글을 수정하였습니다."});
//     } catch (error) {
//         console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
//         res.status(400).send();
//     }
// });

// // 게시글 삭제
// router.delete("/:_id", async (req, res) => {
//     try {
//         const _id = req.params._id;

//         const password = req.body["password"];
//         const isExist = await Post.findOne({_id, password});

//         if (!isExist || !_id) {
//             console.log(`${req.method} ${req.originalUrl} : 일치하지 않는 비밀번호 입니다.`);
//             res.status(406).send();
//             return;
//         }

//         await Post.deleteOne({_id});
//         res.send({result: "게시글을 삭제하였습니다."});
//     } catch (error) {
//         console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
//         res.status(400).send();
//     }
// });

module.exports = router;
