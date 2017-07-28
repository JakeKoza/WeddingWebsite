var http = require('http');
var https = require('https');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var path = require('path');
var fs = require('fs');

var app = express();

var port = process.env.PORT || 5000;

var nav =  [{
				Link: '/',
				Text: 'Home'
			}];


var ceremonyRouter = require('./src/routes/ceremonyRoutes')(nav);
var receptionRouter = require('./src/routes/receptionRoutes')(nav);
var accomodationRouter = require('./src/routes/accomodationRoutes')(nav);
//var directionsRouter = require('./src/routes/directionsRoutes');
var rsvpRouter = require('./src/routes/rsvpRoutes')(nav);
//var registryRouter = require('./src/routes/registryRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(cookieParser());
//app.use(session({secret: 'batata'}));

//require('./src/config/passport');

app.set('views','./src/views');
app.set('view engine', 'ejs');

app.use('/Ceremony', ceremonyRouter);
app.use('/Reception', receptionRouter);
app.use('/Accomodations', accomodationRouter);
app.use('/Register', rsvpRouter);
app.use('/Admin', adminRouter);
//app.use('/Registry', registryRouter);

app.get('/', function(req, res){
	res.render('index', {title: 'Home', nav: nav});
	/*if(!req.user){
		res.render('index', {title: 'Home', 
						nav: nav
						});
		
	} else{
		if(req.user.username === 'ksquared' && nav.length !== 4){
			nav.push( {Link: '/admin',
				Text: 'Admin'});
				res.render('index', {title: 'Home', 
						nav: nav
						});
		}else{
			res.render('index', {title: 'Home', 
						nav: nav
						});
		}
	}*/

});

var httpServer = http.createServer(app);

httpServer.listen(port, function(err){
	console.log('Http server running on port ' + port);
});


