var	express		= require('express');
var router		= express.Router();
var userModel	= require.main.require('./models/user-model');

//Login
router.get('/',function(req,res){
	console.log("Requested : Login");
	res.render('login/index');
});
router.post('/',function(req,res){
	var us={
		uname	: req.body.uname,
		password	: req.body.password,		
	}
	userModel.validate(us,function(status){
		if(status){
			
				userModel.getType(us,function(results){
				var type = JSON.stringify(results.type);
				console.log(type);
				if(type=='"admin"'){
					//req.session.uname = req.body.uname;
					res.redirect('/adminhome');
				}
				else if(type=='"scout"'){
					res.send('scout');
				}
				else{
					//res.send('generaluser');
					res.redirect('/adminhome');
				}

				});			
		}
		else{			
			res.redirect('/login');
		}
	});
});



//Registration
router.get('/registration',function(req,res){
	console.log("Requested : Registration");
	res.render('login/Registration');
});

router.post('/registration',function(req,res){
	var us={
	
		uname		: req.body.uname,
		contno		: req.body.contno,
		password	: req.body.password,
		type		: req.body.type,
	}
	console.log(us);
	userModel.insert(us,function(status){
		if(status){
			console.log(status);
			req.session.uname = req.body.uname;
			res.redirect('/login');
		}
		else{
			res.redirect('/login/registration');				
		}
	});
});


router.get('/index',function(req,res){
	console.log("Requested : adminhome");
	res.render('adminhome/index');
});

module.exports = router;