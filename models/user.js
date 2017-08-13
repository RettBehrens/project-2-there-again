// my requirements
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var Business = require('./business.js');

// User model Schema
var User = mongoose.Schema({
  local : {
    firstName: String,
    lastName: String,
    favoriteFood: String,
    favoriteDrink: String,
    email: String,
    password: String,
    userList: [Business.schema]
  }
});

// special encryption sauce
User.methods.hash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// some more special encryption sauce
User.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
  };

// export that User model
module.exports = mongoose.model('User', User);