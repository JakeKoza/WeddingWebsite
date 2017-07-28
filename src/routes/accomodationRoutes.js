var express = require('express');
var accomodationRouter = express.Router();

var router = function(nav){
	accomodationRouter.route('/').get( function(req, res){
		res.render('accomodations', {nav: nav});
	});
	
	return accomodationRouter;
}

module.exports = router;
