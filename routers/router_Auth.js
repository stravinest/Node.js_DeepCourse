const express = require('express');
const router = express.Router();
const {authValidation} =require('../controllers/conLogin');

router.post('/',authValidation);

module.exports=router

