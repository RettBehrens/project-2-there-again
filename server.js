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
var clientId	= process.env.clientId || require('./env.js').clientId;
var clientSecret	= process.env.clientSecret || require('./env.js').clientSecret;

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

var db = require('./models');

app.get('/searchResults', function(req,res) {
	var businessResultsList = [];
	
	var mySearchBusinessName = req.query.businessName;
	var mySearchBusinessLocation = req.query.businessCity;
	console.log(mySearchBusinessName);
	console.log(mySearchBusinessLocation);
	
	var searchRequest = {
		term: mySearchBusinessName,
  	location: mySearchBusinessLocation
	};
	console.log(searchRequest);
	
	console.log('about to run the Yelp API call');
	yelp.accessToken(clientId, clientSecret).then(response => {
  		const client = yelp.client(response.jsonBody.access_token);
  		client.search(searchRequest).then(response => {
	    	var jsonifiedBody = JSON.parse(response.body);
	    	var businesses = jsonifiedBody.businesses;
	    	for(i = 0; i < businesses.length; i++) {
		    	var business = {
		    		name: businesses[i].name,
		    		image: businesses[i].image_url,
		    		yelp: businesses[i].url,
		    		address: businesses[i].location.display_address
		    	};
		    	businessResultsList.push(business);
		    }
		    console.log('the Yelp API call ran');
		    console.log(businessResultsList);
	    	res.render("searchResults", {businessResultsList: businessResultsList});
  		});
	});
});

app.post('/profile', function authenticatedUser(req, res, next) {
	if(req.isAuthenticated()) return next();
	res.redirect('/');
}, function business_add(req, res) {
	console.log(req.user);
	db.User.findOne({_id: req.user._id}, function(err, user) {
		if (err) {
			console.log(err);
		} else if (user) {
			// console.log(user);
			db.Business.create(req.body, function(err, business) {
    		user.local.userList.push(business);
    		console.log(business);
    		user.save(function(err, doesntmatter) {
    			if (err) {
    				console.log(err);
    			} else {
    				console.log(doesntmatter);
    			}
    		});
    		//res.json(business);
  		});
		} else {
			console.log('the ether');
		}
	});
});

app.listen(process.env.PORT || 3000);