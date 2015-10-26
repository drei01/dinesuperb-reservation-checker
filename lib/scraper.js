var request    = require('request');
var cheerio    = require('cheerio');

//
// Scraper Service
// -----------------------------------

module.exports = function(queryUrl, callback) {
    
    var json = {
        available_times:[]
    };

  // Load the OpenTable URL to be scraped.
  request(queryUrl, function(error, response, html) {

    if (!error) {

      console.log('Response received. Scraper running.');

      // Use Cheerio to load the page.
      var $ = cheerio.load(html);
    
        //for each available time
        $('li.ti').each(function(){
            var time = $(this).text();//pull the time from the list item
            if(time.trim()){//check it's not blank
                json.available_times.push(time);//push it into the list to return
            }
        });
        callback(json);
    }
    else {
      callback(error);
    }

  });

}
