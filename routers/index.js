const express = require('express');
const Users = require('./router_Users');
const Login = require('./router_Login');
const posts = require('./router_Posts');
const Users_me = require('./router_Users_me');
const GetPosts = require('./router_getPosts');

const router = express.Router();
router.use('/users/', Users);
router.use('/login/', Login);
router.use('/posts/', posts);
router.use('/users/me/', Users_me);
router.use('/getPosts/', GetPosts);

module.exports = router;
