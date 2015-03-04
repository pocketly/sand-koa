var sand = require('sand');
var HTTP = require('../../../lib/Http');

var app = sand({
  appPath: __dirname
});

app
  .use(HTTP)
  .start();