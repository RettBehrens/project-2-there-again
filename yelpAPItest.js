'use strict';

const yelp = require('yelp-fusion');
const mySecretInfo = require('./env.js');

const mySearchBusinessName = 'starbucks';
const mySearchBusinessLocation = 'aurora, co';

const searchRequest = {
  term: mySearchBusinessName,
  location: mySearchBusinessLocation
};

function useYelpApi() {
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

}

useYelpApi();






app.post('/searchResults', function(req,res) {
  var businessResultsList = [];
  var mySearchBusinessName = req.body.businessName;
  var mySearchBusinessLocation = req.body.businessCity;
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
          console.log(businessResultsList);
          res.json(businessResultsList);
          //res.render('searchResults', {businessResultsList: businessResultsList});
        });
    });
  };
  runYelpAPICall();
});