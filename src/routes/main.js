
var express = require('express');
var main = express.Router();
var User = require('../models/user');
var Post = require('../models/post');
// var Category = require('../models/category');
var Taxonomy = require('../models/taxonomy');

var mid = require('../middleware');

main.get('/', function(req, res){
    
    const path = req.path;
    res.locals.path = path;

    if(req.session && req.session.userId){
      return res.redirect('/login');
    }else{
      return res.redirect('/admin');
    }

});

// Profile

main.get('/profile', mid.requiresLogin, function(req, res, next){
  User.findById(req.session.userId)
    .exec(function(error, user){
      if(error){
        next(error);
      }else{
        res.render('profile', {
          title: 'Profile',
          fullname: user.fullname
        });
      }
    });
});

module.exports = main;