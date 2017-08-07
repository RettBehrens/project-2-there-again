var express 		= require('express');
var app 			= express();
var mongoose 		= require('mongoose');
var passport 		= require('passport');
var flash 			= require('connect-flash');
var morgan 			= require('morgan');
var cookieParser 	= require('cookie-parser');
var bodyParser 		= require('body-parser');
var session 		= require('express-session');
var yelp			= require('yelp-fusion');
var mySecretInfo	= require('./env.js')

mongoose.connect('mongodb://localhost/project-2-there-again');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.set('views', './views');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

// session secret is not associated with the "secret page" view from the lab, rather a necessary key for passport to run
app.use(session({ secret: 'PROJECT-2-SECRET-EXPRESS' })); 
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash());

require('./config/passport')(passport);

app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	next();
});

var routes = require('./config/routes');
app.use(routes);

app.get('/searchResults', function(req,res) {
	var mySearchBusinessName = req.query.businessName;
	var mySearchBusinessLocation = req.query.businessCity;
	console.log(mySearchBusinessName);
	console.log(mySearchBusinessLocation);
	var searchRequest = {
		term: mySearchBusinessName,
  		location: mySearchBusinessLocation
	};
	console.log(searchRequest);
	console.log('about to run the yelpAPIcall function');
	function runYelpAPICall() {
		console.log("running yelp api function");
		yelp.accessToken(mySecretInfo.clientId, mySecretInfo.clientSecret).then(response => {
	  		const client = yelp.client(response.jsonBody.access_token);
	  		client.search(searchRequest).then(response => {
		    	const firstResult = response.jsonBody.businesses[0];
		    	const firstResultJson = JSON.stringify(firstResult, null, 4);
		    	console.log(firstResultJson);
		    	const secondResult = response.jsonBody.businesses[1];
		    	const secondResultJson = JSON.stringify(secondResult, null, 4);
		    	console.log(secondResultJson);
		    	const thirdResult = response.jsonBody.businesses[2];
		    	const thirdResultJson = JSON.stringify(thirdResult, null, 4);
		    	console.log(thirdResultJson);
		    	const fourthResult = response.jsonBody.businesses[3];
		    	const fourthResultJson = JSON.stringify(fourthResult, null, 4);
		    	console.log(fourthResultJson);
		    	const fifthResult = response.jsonBody.businesses[4];
		    	const fifthResultJson = JSON.stringify(fifthResult, null, 4);
		    	console.log(fifthResultJson);
	  		});
		}).catch(e => {
	  		console.log(e);
		});
	};
	runYelpAPICall();
	function renderAPIResponse(business) {
		console.log('rendering API response', business);
		
	}
});

app.listen(3000);