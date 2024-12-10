const express = require('express');
const helmet = require('helmet');
const app = express();
app.use(helmet.hidePoweredBy()); // This hides the tech used to build web - Express.
app.use(helmet.frameguard({action: 'deny'})); // This sets X-Frame-Option header set to deny - against click jacking.
app.use(helmet.xssFilter()); // This sanitizes input sent to your server - against Cross-Site Scripting attacks.
app.use(helmet.noSniff()); // This sets the X-Content-Type-Options header to nosniff, instructing the browser to not bypass the provided Content-Type - aginst MIME/content sniffing attacks.
app.use(helmet.ieNoOpen()); // This sets the X-Download-Options header to noopen, which prevents Internet Explorer from executing HTML downloads (by default) in context of your trusted site.
timeInSeconds = 90*24*60*60; // 90 days in seconds
app.use(helmet.hsts({maxAge: timeInSeconds, fordce: true})); // This sets the Header Strict-Transport-Security (HSTS) to tell the browsers to use HTTPS for the future requests in a specified amount of time after initial request - against protocol downgrade attacks and cookie hijacking.












































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
