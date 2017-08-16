// my requirements
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

// body and cookie parser
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

// setting the view engine and requiring ejs
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

// require the models
var db = require('./models');

// this gets the search results from Yelp and renders them to the results page
app.get('/searchResults', function(req,res) {
	// define an empty array for the search results
	var businessResultsList = [];
	
	// define variables for the search terms (business and city), the user provided input
	var mySearchBusinessName = req.query.businessName;
	var mySearchBusinessLocation = req.query.businessCity;
	console.log(mySearchBusinessName);
	console.log(mySearchBusinessLocation);
	
	//combine those search term variables into a search request to make Yelp happy
	var searchRequest = {
		term: mySearchBusinessName,
  	location: mySearchBusinessLocation
	};
	console.log(searchRequest);
	
	console.log('about to run the Yelp API call');
	// hit up Yelp for an access token using ID and Secret
	yelp.accessToken(clientId, clientSecret).then(response => {
  		const client = yelp.client(response.jsonBody.access_token);
  		client.search(searchRequest).then(response => {
	    	var jsonifiedBody = JSON.parse(response.body);
	    	var businesses = jsonifiedBody.businesses;
	    	
	    	// for loop allows results to be displayed whether there are 2, 3, 5, or 20 results from Yelp (capped at 20 by Yelp)
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

		    // render those results on the "searchResults" view page
	    	res.render("searchResults", {businessResultsList: businessResultsList});
  		});
	});
});

// this saves a specific business to the users profile from the search results
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
    		user.save(function(err, success) {
    			if (err) {
    				console.log(err);
    			} else {
    				console.log(success);
    			}
    		});
    		//res.json(business);
  		});
		} else {
			console.log('the ether');
		}
	});
});

// this is the edit functionality
app.put('/editRoute', function business_edit(req, res) {
	console.log('edit route reached');
});

// this is the delete functionality
app.delete('/deleteRoute', function business_delete(req, res) {
	console.log('delete route reached');
	businessToDeleteId = req.body.id;
	console.log('var businessToDeleteId defined ' + businessToDeleteId);
	userId = req.user._id;
	console.log('var userId defined ' + userId);
	db.User.findOne({_id: userId}, function(err, user) {
		if(err){
			console.log(err);
		} else {
			console.log('success');
			for(let i = 0; i < user.local.userList.length; i++){
				if (user.local.userList[i]._id == businessToDeleteId) {
					//i
					console.log('so far so good');
					user.local.userList.splice(i, 1);
					break;
				}
			}
			user.save(function(err, success) {
  			if (err) {
  				console.log(err);
  			} else {
  				console.log(success);
  			}
    	});
		}
	});
});

app.listen(process.env.PORT || 3000);