var request    = require('request');

//
// Scraper Service
// -----------------------------------

module.exports = function(queryUrl, callback) {

  // Load the dinesuperb.com URL to be scraped.
  request(queryUrl, function(error, response, data) {

    if (!error) {

      console.log('Response received. Scraper running.');
      const json = JSON.parse(data);
      callback(json.data);
    }
    else {
      callback(error);
    }

  });

}
