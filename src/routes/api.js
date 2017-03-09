
var express = require('express');
var api = express.Router();
var User = require('../models/user');
var Visitor = require('../models/visitor');
var Post = require('../models/post');
// var Category = require('../models/category');
var Taxonomy = require('../models/taxonomy');

var mid = require('../middleware');

api.post('/add_visitor', function(req, res, next){

	console.log('yeah apiu');

	// const ip = req.body.ip;
	// const fullname = req.body.name;

	// let data = {};
 //    data.success = '0';

 //    const visitor = new Visitor(
 //        {
 //            ip: ip,
 //            fullname: fullname
 //        }
 //    );

 //    //save model to MongoDB
 //    visitor.save(function (err) {

 //        if(err) {
 //            data.error = err;
 //            res.send(data);
 //        }else{
 //        	data.msg = 'it worked???';
 //            data.success = '1';
 //            res.send(data);
 //        }

 //    });

 //    res.header("Access-Control-Allow-Origin", "*");
	// res.header("Access-Control-Allow-Headers", "X-Requested-With");

    res.send('Adding visitor...');

});
module.exports = api;