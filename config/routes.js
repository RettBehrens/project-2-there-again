var express = require('express');
var router = express.Router();
// Parses information from POST
var bodyParser = require('body-parser');
// Used to manipulate POST methods
var methodOverride = require('method-override');
var passport = require("passport");
var usersController = require('../controllers/users');
var staticsController = require('../controllers/statics');

function authenticatedUser(req, res, next) {
	if(req.isAuthenticated()) return next();
	res.redirect('/');
}

router.route('/')
  .get(staticsController.home);

router.route('/profile')
  .get(staticsController.profile);

router.route('/search')
  .get(staticsController.search);

router.route('/signup')
  .get(usersController.getSignup)
  .post(usersController.postSignup);

router.route('/login')
  .get(usersController.getLogin)
  .post(usersController.postLogin);

router.route("/logout")
  .get(usersController.getLogout);

// router.route("/secret")
// 	.get(authenticatedUser, usersController.secret)

module.exports = router;