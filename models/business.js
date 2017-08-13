// my requirements
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Business model Schema
var BusinessSchema = new Schema({
	businessName: String,
	businessImageURL: String,
	businessYelpURL: String,
	businessAddress: [String],
	thereAgain: Boolean
	//userDescription: String
});

// export that Business model
module.exports = mongoose.model('Business', BusinessSchema);