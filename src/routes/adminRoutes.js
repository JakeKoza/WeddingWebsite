var express = require('express');
var mongodb = require('mongodb').MongoClient;
var adminRouter = express.Router();
var url = 'mongodb://localhost:27017/wedding'

var router = function(nav){

	adminRouter.route('/')
		.get(function(req, res){
			mongodb.connect(url, function(err, db){
				var collection = db.collection('rsvp'); 
				collection.find({attending: true}).toArray(function(err, results){
					var confirm = results;
					collection.find({attending: false}).toArray(function(err, results){
						var regrets = results;
						collection.find({$query : {}, $orderby: {date : -1}, $limit: 10}).toArray(function(err, results){
							var responses = results;
							//console.log(responses)
							res.render('admin/admin', {confirm: confirm, regrets: regrets, responses: responses});

						});
					});
				});

			});

		});

	adminRouter.route('/confirmed')
		.get(function(req, res){
			mongodb.connect(url, function(err, db){
				var collection = db.collection('rsvp');
				collection.find({attending: true}).toArray(function(err, results){
					res.render('admin/details', {results: results, details: "Confirmed"});
				});
			});
		});

	adminRouter.route('/declined')
        .get(function(req, res){
            mongodb.connect(url, function(err, db){
                var collection = db.collection('rsvp');
                collection.find({attending: false}).toArray(function(err, results){
                    res.render('admin/details', {results: results, details: "Declined"});
                });
            });
        });

	adminRouter.route('/load')
		.get(function(req, res){
			res.render('admin/load', {message: null});
		})
		.post(function(req, res){
			var id = Number(req.body.cardID);
			var num = Number(req.body.numberOfRSVP)
			mongodb.connect(url, function(err, db){
				var collection = db.collection('id');
				collection.insert({_id: id, invitationName: req.body.invitationFamily, number: num}, function(err, results){
					if(err){
						res.render('admin/load', {message: {code: 1, text: "error"}});
					}
					else{
						res.render('admin/load', {message: {code: 2, text: "success"}});
					}
				});
			});
		});
	
	adminRouter.route('/unresponsive')
		.get(function(req, res){
			pass;
		});


	return adminRouter;
}

module.exports = router;
