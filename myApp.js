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
app.use(helmet.dnsPrefetchControl()); // This disables DNS prefetching, at the cost of a performance penalty.
app.use(helmet.noCache()); // This is useful when you are releasing an update for your website or in development. Note: you will loose caching benefits such as less requests to the server.
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ['self', 'trusted-cdn.com']
  }
})) // This cinfigures Content Security Policy (CSP) that can help prevent the injection of anything unintended into your page by defining an allowed list of content sources which are trusted (scripts, stylesheets, fonts, frames, media, and so on...) - against XSS, tracking, 
// By default, directives are wide open, so it’s important to set the defaultSrc directive as a fallback. Helmet supports both defaultSrc and default-src naming styles. The fallback applies for most of the unspecified directives.









































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
