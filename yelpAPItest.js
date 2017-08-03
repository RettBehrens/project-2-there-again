'use strict';

const yelp = require('yelp-fusion');
const mySecretInfo = require('./env.js');

const searchRequest = {
  term:'casa bonita',
  location: 'co'
};

function useYelpApi() {
console.log("running yelp api function");
yelp.accessToken(mySecretInfo.clientId, mySecretInfo.clientSecret).then(response => {
  const client = yelp.client(response.jsonBody.access_token);

  client.search(searchRequest).then(response => {

    const firstResult = response.jsonBody.businesses[0];
    const prettyJson = JSON.stringify(firstResult, null, 4);
    console.log(prettyJson);
  });
}).catch(e => {
  console.log(e);
});

}

useYelpApi();