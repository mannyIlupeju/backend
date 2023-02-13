const express = require('express')
const router = express.Router()
const {getPost, createPost, readPost, deletePost} = require('../controllers/blogPost.js')
//to make a route private we need to import the verifyToken module
const verify = require ('./verifyToken')


//get blog posts
router.get('/', getPost)
router.get('/post/:id', readPost)
router.post('/', verify, createPost)
router.delete('/post/:id', deletePost)
////////////////////////////////////////////////







module.exports = router