const https = require('https');
const fs = require('fs');
const hsts = require('hsts')
const express = require('express');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};
const port = 443;

app = express();

app.use(hsts({
  maxAge: 15552000  // 180 days in seconds
}))

app.get('/', function(req, res)
{
  res.send("Hello world !");
});

https.createServer(options, app)
.listen(443);