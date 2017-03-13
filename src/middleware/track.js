var User = require('../models/user');

function canAccessApi(req, res, next){

	console.log('yghujbkj');

	let data = {};
	data.success = '0';

	if(req.body.secret == 'goodeveningbastion'){
		
		User.authenticate(req.body.apiemail, req.body.apipassword, function(error, user){
			
			if(error || !user){
				res.send('No user found: api access denied');
			}else{

				req.apiUser = user;
				return next();

			}

		});

	}else{
		res.send('Nope');
	}

}

module.exports.canAccessApi = canAccessApi;