var express = require('express');
var ceremonyRouter = express.Router();

var router = function(nav){
	ceremonyRouter.route('/').get( function(req, res){
		res.render('ceremony', {nav: nav});
	});
	
	return ceremonyRouter;
}

module.exports = router;
