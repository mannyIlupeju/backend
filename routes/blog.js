const express = require('express')
const router = express.Router()
const User = require('../models/auth')
const bcrypt = require('bcryptjs') //we use this to protect the password 
const {getPost, createPost, readPost, deletePost} = require('../controllers/blogPost.js')
const {registerValidation, loginValidation} = require('../validation')





//get blog posts
router.get('/', getPost)
router.get('/post/:id', readPost)
router.post('/', createPost)
router.delete('/post/:id', deletePost)
////////////////////////////////////////////////





//for setting up the registeration validation functionality 
router.post('/register', async (req,res)=>{
  
  //Validate data before we add a user 
  const {error} = registerValidation(req.body)
  if(error) return res.status(400).send(error.details[0].message)



  //check if user is in database
  const emailExist = await User.findOne({email: req.body.email})
  if (emailExist) res.status(400).send('Email already exists')


  //Hash the password - We must protect password from being visible when we save it
  const salt = await bcrypt.genSalt(10) //the complexity of the string that will get generated to protect our password
  const hashedPassword = await bcrypt.hash(req.body.password, salt)



  // Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });

  try {
    const savedUser = await user.save()
    res.send({user: user._id})
  }catch(err) {
    res.status(400).send(err)
  }
})



router.post('/login', async (req,res)=>{
   const {error} = loginValidation(req.body)
   if(error) return res.status(400).send(error.details[0].message)

   //CHECK IF USER EXISTS
   const user = await User.findOne({email: req.body.email})
   if(!user) return res.status(400).send("Email is not found")

   //CHECK IF PASSWORD IS CORRECT
   const validPass = await bcrypt.compare(req.body.password, user.password) 
   if(!validPass) return res.status(400).send('Login failed')
   

   res.send('Login successful')

   

})



module.exports = router