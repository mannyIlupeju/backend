"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../controllers/authPost.js'),
    registerPost = _require.registerPost,
    loginPost = _require.loginPost; //for setting up the registeration validation functionality 


router.post('/register', registerPost);
router.post('/login', loginPost);
module.exports = router;
//# sourceMappingURL=auth.dev.js.map
