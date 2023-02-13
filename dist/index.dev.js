"use strict";

var express = require('express');

var app = express();

var dotenv = require('dotenv').config();

var mongoose = require('mongoose');

var cors = require('cors');

var bodyParser = require('body-parser'); //Import Routes


var blogRoute = require('./routes/blog');

var authRoute = require('./routes/auth'); //setting up the body parser


app.use(bodyParser.json({
  limit: "30mb",
  extended: true
}));
app.use(bodyParser.urlencoded({
  limit: "30mb",
  extended: true
}));
app.use(cors()); //Creating middlewares

app.use('/blog', blogRoute);
app.use('/blog/auth', authRoute);
var PORT = process.env.PORT || 8080; //CONNECTING TO MONGOOSE

mongoose.connect(process.env.CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return app.listen(PORT, function () {
    console.log('Server is up and running');
  });
})["catch"](function (error) {
  return console.log(error);
});
mongoose.set("strictQuery", false);
//# sourceMappingURL=index.dev.js.map
