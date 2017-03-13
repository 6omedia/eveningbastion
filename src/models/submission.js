var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var SubmissionSchema = new mongoose.Schema({
	ip: String,
	date: Date,
	domain: String,
	data_point: {
		name: String,
		value: String
	}
});

var Submission = mongoose.model('Submission', SubmissionSchema);
module.exports = Submission;