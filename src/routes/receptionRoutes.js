var express = require('express');
var receptionRouter = express.Router();

var router = function(nav){
	receptionRouter.route('/').get( function(req, res){
		res.render('reception', {nav: nav});
	});
	
	return receptionRouter;
}

module.exports = router;
