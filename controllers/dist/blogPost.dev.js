"use strict";

var _require = require('jsonwebtoken'),
    JsonWebTokenError = _require.JsonWebTokenError;

var mongoose = require('mongoose');

var blogMessage = require('../models/blogMessage');

var verify = require('../routes/verifyToken');

var jwt = 'jsonwebtoken';

var getPost = function getPost(req, res) {
  var blogPost;
  return regeneratorRuntime.async(function getPost$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(blogMessage.find());

        case 3:
          blogPost = _context.sent;
          res.status(200).json(blogPost);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(404).json({
            message: _context.t0.message
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var readPost = function readPost(req, res) {
  var id, post;
  return regeneratorRuntime.async(function readPost$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          console.log(id);

          if (mongoose.Types.ObjectId.isValid(id)) {
            _context2.next = 4;
            break;
          }

          return _context2.abrupt("return", res.status(404).send('No Post with that id'));

        case 4:
          _context2.next = 6;
          return regeneratorRuntime.awrap(blogMessage.findById(id));

        case 6:
          post = _context2.sent;
          res.json(post);

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var createPost = function createPost(req, res) {
  var post, newPost;
  return regeneratorRuntime.async(function createPost$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          //withdraw post from req 
          post = req.body; //To create new post push post inside blogMessage function

          newPost = new blogMessage(post);
          _context3.prev = 2;
          console.log(req);
          _context3.next = 6;
          return regeneratorRuntime.awrap(newPost.save());

        case 6:
          res.status(201).json(newPost);
          _context3.next = 12;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](2);
          res.status(409).json({
            message: _context3.t0.message
          });

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[2, 9]]);
};

var deletePost = function deletePost(req, res) {
  var id;
  return regeneratorRuntime.async(function deletePost$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;

          if (mongoose.Types.ObjectId.isValid(id)) {
            _context4.next = 3;
            break;
          }

          return _context4.abrupt("return", res.status(404).send('No post with that id'));

        case 3:
          _context4.next = 5;
          return regeneratorRuntime.awrap(blogMessage.findByIdAndRemove(id));

        case 5:
          res.json({
            message: 'Post deleted successfully'
          });

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
};

module.exports = {
  getPost: getPost,
  createPost: createPost,
  readPost: readPost,
  deletePost: deletePost
};
//# sourceMappingURL=blogPost.dev.js.map
