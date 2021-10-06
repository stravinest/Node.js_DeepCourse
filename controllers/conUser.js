const { User } = require('../models');

exports.validation= async(req,res)=>{
  try {
    const { nickname, password, passwordConfirm } = req.body;
    //사용자정보를 받아옴 
    const isExist = await User.findOne({ where: { nickname } });
    //가입했는지 조회
    if (isExist === null) { //가입이 안되어이쓰면 아래 실행
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
      } 
      
      else {
        res.send({ result: '회원가입실패' });
      }
    } else {//가입이 되어있으면 에러 표시
      
      res.send({
         errorMessage:'중복된 아이디 입니다.'
      });
    }
  } catch (error) {
    console.log(`${req.method}실패인가 ${req.originalUrl} : ${error.message}`);
    res.status(400).send();
  }
};