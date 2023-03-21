const express = require('express')
const router = express.Router()
const {registerPost, loginPost} = require ('../controllers/authPost.js')



//for setting up the registeration validation functionality 
router.post('/register', registerPost) 
router.post('/login',loginPost)





module.exports = router;