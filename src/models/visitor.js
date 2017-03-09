// never used to login a user just to save infomation

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var VisitorSchema = new mongoose.Schema({
	fullname: String,
	ip: Array,
	email: Array,
	phone: String,
	birthday: Date,
	sex: String,
	address: String,
	postcode: String,
	relationship_status: String,
	education_level: String,
	work_industry: String,
	income: Number,
	home_type: String,
	home_composition: String,
	sixom_visited_sites: Array
});

var Visitor = mongoose.model('Visitor', VisitorSchema);
module.exports = Visitor;


