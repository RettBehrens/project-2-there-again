// require mongoose
var mongoose = require('mongoose');
mongoose.connect(	
	process.env.MONGODB_URI ||
	process.env.MONGOLAB_URI ||
	process.env.MONGOHQ_URL ||
					"mongodb://localhost/project-2-there-again");

// export User and Business models
module.exports.User = require('./user.js');
module.exports.Business = require('./business.js');