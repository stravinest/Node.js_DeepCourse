const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const renders = require('./renders'); // 렌더 페이지
const routers = require('./routers'); // 통신을 수행하는 Router 생성

const app = express();
const port = 3000;

// 최 상단에서 request로 수신되는 Post 데이터가 정상적으로 수신되도록 설정한다.
// 주소 형식으로 데이터를 보내는 방식
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('./views'));// public

// html을 대체하는 ejs 엔진을 설정
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/api', routers);
app.use('/', renders);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
