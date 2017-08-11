const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

module.exports = function(passport) {

	passport.serializeUser(function(user, callback) {
		callback(null, user.id);
	});

	passport.deserializeUser(function(id, callback) {
		User.findById(id, function(err, user) {
			callback(err, user);
		});
	});

	passport.use('local-signup', new LocalStrategy({
		firstNameField: 'firstName',
		lastNameField: 'lastName',
		favoriteFoodField: 'favoriteFood',
		favoriteDrinkField: 'favoriteDrink',
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, function(req, email, password, callback) {
		User.findOne({'local.email' : email}, function(err, user) {
			if(err) return callback(err);
			if(user) {
				return callback(null, false, req.flash('signupMessage', 'This email is already used.'));
			} else {
				let newUser = new User();
				newUser.local.firstName = req.body.firstName;
				newUser.local.lastName = req.body.lastName;
				newUser.local.favoriteFood = req.body.favoriteFood;
				newUser.local.favoriteDrink = req.body.favoriteDrink;
				newUser.local.email = email;
				newUser.local.password = newUser.hash(password);
				newUser.local.userList = [];
				
				newUser.save(function(err) {
					if(err) throw err;
					return callback(null, newUser);
				});
			}
		});
	}));
	passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, function(req, email, password, callback) {
		User.findOne({ 'local.email' :  email }, function(err, user) {
      if (err) {
        return callback(err);
      }

      // If no user is found
      if (!user) {
        return callback(null, false, req.flash('loginMessage', 'No user found.'));
      }
      // Wrong password
      if (!user.validPassword(password)) {
        return callback(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
      }

      return callback(null, user);
    });
	}));
};
