var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BusinessSchema = new Schema({
	businessName: String,
	businessImageURL: String,
	businessYelpURL: String,
	businessAddress: [String],
	thereAgain: Boolean,
	userDescription: String
});

var Business = mongoose.model('Business', BusinessSchema);

module.exports = Business; 