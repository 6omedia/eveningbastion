
var express = require('express');
var cms_main = express.Router();
var User = require('../../models/user');
var Post = require('../../models/post');
var Taxonomy = require('../../models/taxonomy');
var mid = require('../../middleware');

// define the home page route
// Home

/** User Routes and backend **/

// login for user or admin assign user a permission
cms_main.get('/login', mid.loggedOut, function(req, res){
  res.render('login');
});

cms_main.post('/login', function(req, res, next){
  if(req.body.email && req.body.password){
    User.authenticate(req.body.email, req.body.password, function(error, user){
      if(error || !user){
        var err = new Error('Wrong email or password');
        err.status = 401;
        res.render('error', {title: 'Error', error: err});
      }else{
        req.session.userId = user._id;

        User.findById(req.session.userId)
          .exec(function(error, user){
            if(error){
              next(error);
            }else{

              // check if admin
              if(user.user_role == 'admin' || user.user_role == 'super_admin'){
 
                res.redirect('/admin');

              }else{
                return res.redirect('/');
              }

            }
          });

      }
    });
  }else{
    var err = new Error('No email or password submited');
    err.status = 400;
    res.render('login', {title: 'Error', error: err});
  }
});

// register/signup (only for non-admins)

// cms_main.get('/signup', mid.loggedOut, function(req, res){
//   res.render('signup', {title: 'Sign Up'});
// });

// cms_main.post('/signup', function(req, res, next){
//   if(req.body.fullName &&
//      req.body.email && 
//      req.body.password &&
//      req.body.passwordConfirm){

//     // confirmed password
//     if(req.body.password !== req.body.passwordConfirm){
//       var err = new Error('Passwords do not match');
//       err.status = 400;
//       res.render('error', {title: 'Error', error: err}); // res.send(err); //next(err);
//     }

//     // create obj with form input
//     var userData = {
//       fullname: req.body.fullName,
//       email: req.body.email,
//       password: req.body.password,
//       isadmin: false,
//       permissions: [{
//         manage_posts: false,
//         manage_users: false
//       }]
//     }

//     // add to mongo db
//     User.create(userData, function(error, user){
//       if( error ){
//         next(error);
//       }else{
//         req.session.userId = user._id;
//         res.redirect('/profile');
//       }
//     });

//   }else{
//     var err = new Error('Please fill out required fields');
//     err.status = 400;
//     res.render('error', {title: 'Error', error: err});
//   }

// });

cms_main.get('/logout', function(req, res, next){
  if(req.session){
    req.session.destroy(function(err){
      if(err){
        next(err);
      }else{
        res.redirect('/');
      }
    });
  }
});

cms_main.get('/posts/:slug', function(req, res, next){
  
    const slug = req.params.slug;

    Post.find({slug: slug}).exec(function(err, post){
        res.render('single_post', {
            post: post
        });
    });

});

module.exports = cms_main;
