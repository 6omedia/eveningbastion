
var express = require('express');
var api = express.Router();
var User = require('../models/user');
var Visitor = require('../models/visitor');
var Post = require('../models/post');
var Submission = require('../models/submission');
// var Category = require('../models/category');
var Taxonomy = require('../models/taxonomy');

var mid = require('../middleware');
var track = require('../middleware/track');

// api.post('/track', );

api.post('/add-submissions', track.canAccessApi, function(req, res, next){

	let data = {};
    data.success = '0';

    // const ip = req.ip;

    const ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;

    const dataPoints = JSON.parse(req.body.dataPoints);

    let subFailed = false;

    for(sub of dataPoints){

    	const submission = new Submission(
	        {
	            ip: ip,
	            date: Date.now(),
				domain: req.body.domain,
				data_point: {
					name: sub.name,
					value: sub.value
				}
	        }
	    );

	    submission.save(function(err) {
	        if(err) {
	        	subFailed = true;
	        }
	    });

    }


    if(!subFailed){
    	data.success = '1';
    }

    res.send(data);

});

api.post('/add-pageviews', track.canAccessApi, function(req, res, next){

	// add to pages if page not in db

});

api.post('/add-clicks', track.canAccessApi, function(req, res, next){

});

module.exports = api;