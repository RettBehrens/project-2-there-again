var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var Business = require('./business.js');

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

User.methods.hash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

User.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
  };

module.exports = mongoose.model('User', User);