const mongoose = require('mongoose');

//CREATE A SCHEMA
const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  body: String, 
  tags: [String],
  link: String,
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0
  },
  description: String,
  createdAt: {
    type: Date,
    default: new Date()
  }

})

//turn schema to a model

const blogMessage = mongoose.model('blogMessage', blogSchema);

module.exports = blogMessage