var express = require('express');
var mongodb = require('mongodb').MongoClient;
var registerRouter = express.Router();
var ObjectId = require('mongodb').ObjectId;


var router = function(nav){
	registerRouter.route('/')
		.get( function(req, res){
			res.render('register', {nav: nav, message: null});
		})
		.post(function(req, res){
			console.log(req.body);
			var id = Number(req.body.cardID);
			//var id = new ObjectId(req.body.cardID);
			var url = 'mongodb://localhost:27017/wedding';
			mongodb.connect(url, function(err, db){
				var ids = db.collection('id');
				var rsvps = db.collection('rsvp'); 
				ids.findOne({_id: id}, function(err, results){
					console.log(results);
					if(results == null){
						res.render('register', {nav: nav, message: {code: 1, text: "error"}});
					}else{
						var rsvp = {
							cardID: req.body.cardID,
							firstName: req.body.firstName,
							lastName: req.body.lastName,
							meal: req.body.meal,
							date: new Date(),
							attending: true
						};
					
						rsvps.insert(rsvp, function(err, results){
							res.render('register', {nav: nav, message: {code: 2, text: "success"}});
						});
					}
				});
				/*var rsvp = {
					cardID: req.body.cardID,
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					meal: req.body.meal,
					date: new Date(),
					attending: true
				};
			
				collection.insert(rsvp, function(err, results){
					res.render('register', {nav: nav,  message: 1});
				});*/
	
			});
		});

	registerRouter.route('/regrets').get(function(req, res){
		res.render('regrets', {nav: nav});
	});
	
	return registerRouter;
}

module.exports = router;
