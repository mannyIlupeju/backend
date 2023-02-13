
const User = require('../models/auth')
const jwt = require('jsonwebtoken') //for login verification
const bcrypt = require('bcryptjs') //we use this to protect the password 
const {registerValidation, loginValidation} = require('../validation')


const registerPost = async (req,res)=>{
  //Validate data before we add a user 
  const {error} = registerValidation(req.body)
  if(error) return res.status(400).send(error.details[0].message)



  //check if user is in database
  const emailExist = await User.findOne({email: req.body.email})
  if (emailExist) res.status(400).send('Email already exists')


  //Hash the password - We must protect password from being visible when we save it
  const salt = await bcrypt.genSalt(10) //the complexity of the string that will get generated to protect our password
  const hashedPassword = await bcrypt.hash(req.body.password, salt)



  // To Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });

  try {
    const savedUser = await user.save()
    
  } catch(err) {
    res.status(400).send(err)
  }
}


const loginPost = async (req,res)=>{
   const {error} = loginValidation(req.body)
   if(error) return res.status(400).send(error.details[0].message)

   //CHECK IF USER EXISTS
   const user = await User.findOne({email: req.body.email})
   if(!user) return res.status(400).send("Email is not found")

   //CHECK IF PASSWORD IS CORRECT
   const validPass = await bcrypt.compare(req.body.password, user.password) 
   if(!validPass) return res.status(400).send('Login failed')
   
  //Create and assign a token
  //it takes the ID to know the user is logged in and a secret token
  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET); 
  res.header('Authorization', token).send({token})

}


module.exports = {registerPost, loginPost}