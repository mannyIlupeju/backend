"use strict";

var User = require('../models/auth');

var jwt = require('jsonwebtoken'); //for login verification


var bcrypt = require('bcryptjs'); //we use this to protect the password 


var _require = require('../validation'),
    registerValidation = _require.registerValidation,
    loginValidation = _require.loginValidation;

var _require2 = require('joi'),
    isError = _require2.isError,
    valid = _require2.valid;

var registerPost = function registerPost(req, res) {
  var _registerValidation, error, emailExist, salt, hashedPassword, user, savedUser;

  return regeneratorRuntime.async(function registerPost$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          //Validate data before we add a user 
          _registerValidation = registerValidation(req.body), error = _registerValidation.error;

          if (!error) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).send(error.details[0].message));

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.email
          }));

        case 5:
          emailExist = _context.sent;
          if (emailExist) res.status(400).send('Email already exists'); //Hash the password - We must protect password from being visible when we save it

          _context.next = 9;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 9:
          salt = _context.sent;
          _context.next = 12;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.password, salt));

        case 12:
          hashedPassword = _context.sent;
          // To Create a new user
          user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
          });
          _context.prev = 14;
          _context.next = 17;
          return regeneratorRuntime.awrap(user.save());

        case 17:
          savedUser = _context.sent;
          _context.next = 23;
          break;

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](14);
          res.status(400).send(_context.t0);

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[14, 20]]);
};

var loginPost = function loginPost(req, res) {
  var _loginValidation, error, user, validPass, token;

  return regeneratorRuntime.async(function loginPost$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _loginValidation = loginValidation(req.body), error = _loginValidation.error;

          if (!error) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.status(400).send(error.details[0].message));

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.email
          }));

        case 5:
          user = _context2.sent;

          if (user) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", res.status(400).send("Email is not found"));

        case 8:
          _context2.next = 10;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.password, user.password));

        case 10:
          validPass = _context2.sent;

          if (validPass) {
            _context2.next = 13;
            break;
          }

          return _context2.abrupt("return", res.status(400).send('Login failed'));

        case 13:
          //Create and assign a token
          //it takes the ID to know the user is logged in and a secret token
          token = jwt.sign({
            _id: user._id
          }, process.env.TOKEN_SECRET);
          res.header('Authorization', token).send({
            token: token
          });

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  });
};

module.exports = {
  registerPost: registerPost,
  loginPost: loginPost
};
//# sourceMappingURL=authPost.dev.js.map
