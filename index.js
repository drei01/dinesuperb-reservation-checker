var scraper = require('./lib/scraper.js'),
    nodemailer = require('nodemailer'),
    smtpTransport = nodemailer.createTransport("SMTP",{
       service: "Gmail",
       auth: {
           user: process.env.GMAIL_USER,
           pass: process.env.GMAIL_PASSWORD
       }
    });

var check = function (restaurantId, guests, month, year){
    console.log(`Checking ${restaurantId} for ${guests} guests on ${month}/${year}`);
    scraper(`https://api.dinesuperb.com/availability/dates?restaurant=${restaurantId}&guests=${guests}&month=${month}&year=${year}&online=true`, function(dates){
        if (!dates || dates.length == 0) {
            console.log(`No dates found`);
            return;
        }

        smtpTransport.sendMail({
            from: 'YOUR EMAIL HERE',
            to: "YOUR EMAIL HERE",
            subject: "Massimo Reservations!!!",
            text: JSON.stringify(dates)
         }, function(error, response){
            if(error){
                console.log(error);
            }
            process.exit();
         });
        return;
    });
}

var args = process.argv.slice(2);

if (args.length < 3 || args.length > 3) {
  console.log('Usage node index.js restaurantId noGuests dd/mm/yyyy');
  return;
}

const restaurantId = args[0];
const guests = args[1];
const date = args[2];//month/year
const dateParts = date.split('/');
const month = dateParts[0];
const year = dateParts[1];

check(restaurantId, guests, month, year);