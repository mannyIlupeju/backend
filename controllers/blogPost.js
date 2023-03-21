const { JsonWebTokenError } = require('jsonwebtoken')
const mongoose = require('mongoose')
const blogMessage = require('../models/blogMessage')
const verify = require('../routes/verifyToken')
const jwt = ('jsonwebtoken')


const getPost = async (req,res)=>{
  try {
    const blogPost = await blogMessage.find()
    res.status(200).json(blogPost)
  } catch (error) {
    res.status(404).json({message: error.message})
  }
}

const readPost = async(req,res) => {
  const {id} = req.params
  console.log(id)
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post with that id')

  const post = await blogMessage.findById(id)

  res.json(post)

}

const createPost = async(req,res) => {
  //withdraw post from req 
  const post = req.body
  //To create new post push post inside blogMessage function
  const newPost = new blogMessage(post)
  try {
    await newPost.save();
    res.status(201).json(newPost)
  } catch (error) {
    res.status(409).json({message: error.message})
  }
}

const deletePost = async(req, res) => {
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')

  await blogMessage.findByIdAndRemove(id)

  res.json({message: 'Post deleted successfully'})

}


const likePost = async(req, res) => {
  const {id} = req.params
  
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')

  const post = await blogMessage.findById(id)

  const updatedPost = await blogMessage.findByIdAndUpdate(id, {likeCount: post.likeCount + 1}, {new: true})

  res.json(updatedPost)
}



module.exports = {getPost, createPost, readPost, deletePost, likePost}

