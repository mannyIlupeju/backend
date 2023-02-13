"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../controllers/blogPost.js'),
    getPost = _require.getPost,
    createPost = _require.createPost,
    readPost = _require.readPost,
    deletePost = _require.deletePost; //to make a route private we need to import the verifyToken module


var verify = require('./verifyToken'); //get blog posts


router.get('/', getPost);
router.get('/post/:id', readPost);
router.post('/', verify, createPost);
router["delete"]('/post/:id', deletePost); ////////////////////////////////////////////////

module.exports = router;
//# sourceMappingURL=blog.dev.js.map
