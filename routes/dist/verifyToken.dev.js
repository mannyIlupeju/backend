"use strict";

var jwt = require('jsonwebtoken'); //Creating a middlweare function to check if user has that token before they can access a page
//so every private route will have this middleware function


module.exports = function (req, res, next) {
  var token = req.header('Authorization');
  console.log(token);
  if (!token) return res.status(401).send('Access denied');

  try {
    //set the variable to have the jwt.verify(token, secret)
    var verified = jwt.verify(token, process.env.TOKEN_SECRET); //the verify brings the payload that has the id and dateofcreation 

    req.user = verified; //we now have access to the req.user

    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
};
//# sourceMappingURL=verifyToken.dev.js.map
