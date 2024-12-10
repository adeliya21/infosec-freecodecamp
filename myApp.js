const express = require('express');
const helmet = require('helmet');
const app = express();
app.use(helmet.hidePoweredBy()); // This hides the tech used to build web - Express.
app.use(helmet.frameguard({action: 'deny'})); // This sets X-Frame-Option header set to deny - against click jacking.
app.use(helmet.xssFilter()); // This sanitizes input sent to your server - against Cross-Site Scripting attacks.
app.use(helmet.noSniff()); // This sets the X-Content-Type-Options header to nosniff, instructing the browser to not bypass the provided Content-Type - aginst MIME/content sniffing attacks.













































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
