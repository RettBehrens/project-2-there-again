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