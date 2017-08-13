// my requirements
var User = require('../models/user.js');
var BusinessSchema = require('../models/business.js');
var expect = require('chai').expect;

// User test
describe('User', function() {
	describe('new', function() {
		it('initializes a new user', function () {
			var person = new User();
			expect(typeof(person)).to.equal('object');
		});
	});
});

//BusinessSchema test
describe('BusinessSchema', function() {
	describe('new', function() {
		it('initializes a new business', function() {
			var business = new BusinessSchema();
			expect(typeof(business)).to.equal('object');
		});
	});
});