"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../controllers/authPost.js'),
    registerPost = _require.registerPost,
    loginPost = _require.loginPost; // const User = require('../models/auth')
// const jwt = require('jsonwebtoken') //for login verification
// const {registerValidation, loginValidation} = require('../validation')
// const bcrypt = require('bcryptjs') //we use this to protect the password 
//for setting up the registeration validation functionality 


router.post('/register', registerPost);
router.post('/login', loginPost);
module.exports = router;
//# sourceMappingURL=auth.dev.js.map
