const express = require("express");
const Users = require("./router_Users");
const Login = require("./router_Login");
const posts = require("./router_posts");
const Users_me = require("./router_Users_me");
const GetPosts = require("./router_getPosts");


const router = express.Router();
router.use('/users/', Users);//api/users 로 나오면 router_posts.js파일 실행 하러간다.!!
router.use('/login/', Login);//api/login 로 나오면 router_login.js파일 실행 하러간다.!!
router.use('/posts/', posts);//주pi/posts 로 나오면 router_login.js파일 실행 하러간다.!!
router.use('/users/me/', Users_me);//주pi/posts 로 나오면 router_login.js파일 실행 하러간다.!!
router.use('/getPosts/', GetPosts);//주pi/posts 로 나오면 router_login.js파일 실행 하러간다.!!

module.exports = router;