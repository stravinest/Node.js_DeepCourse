const express = require('express');
const { User } = require('../models');
const router = express.Router();

// 회원가입
router.post('/', async (req, res) => {
  try {
    const { nickname, password, passwordConfirm } = req.body;
    const isExist = await User.findOne({where : {nickname} });
    if (isExist===null) {
      let includeTest = true;
      let str = [];
      str = password;
      for (let i = 0; i < str.length; i++) {
        if (nickname.includes(str[i])) {
          includeTest = false;
          console.log(str[i]);
        }
      }
      if (
        /[a-zA-Z0-9]{3,}/gm.test(nickname) &&
        password === passwordConfirm &&
        password.length >= 4 &&
        includeTest
      ) {
        await User.create({ nickname, password, passwordConfirm });
        res.send({ result: '회원가입성공' });
      } else {
        res.send({ result: '회원가입실패' });
      }
    } else {
      console.log('존재하는 아이디 입니다.');
      res.send(error);
    }
  } catch (error) {
    console.log(`${req.method}실패인가 ${req.originalUrl} : ${error.message}`);
    res.status(40).send();
  }
});

// // 모든 게시글 데이터를 반환하는 함수
// router.get("/", async (req, res) => {
//     try {
//         let jsonData = await Post.find().sort({createdAt: -1});
//         for (let x in jsonData) {
//             const createdAt = new Date(jsonData[x]["createdAt"]);
//             const create_date = `${createdAt.getFullYear()}-${
//                 createdAt.getMonth() + 1
//             }-${createdAt.getDate()} ${createdAt.getHours()}:${createdAt.getMinutes()}:${createdAt.getSeconds()}`;
//             jsonData[x]["createdAt"] = create_date;
//         }
//         res.send({result: jsonData});
//     } catch (error) {
//         console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
//         res.status(400).send();
//     }
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
