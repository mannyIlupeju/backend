const express = require('express')
const router = express.Router()
const {registerPost, loginPost} = require ('../controllers/authPost.js')
// const User = require('../models/auth')
// const jwt = require('jsonwebtoken') //for login verification
// const {registerValidation, loginValidation} = require('../validation')
// const bcrypt = require('bcryptjs') //we use this to protect the password 



//for setting up the registeration validation functionality 
router.post('/register', registerPost) 
router.post('/login', loginPost)


module.exports = router;