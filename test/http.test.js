var sand = require('sand');
var HTTP = require('..');

var sandConfig = {
  appPath: __dirname + '/..'
};

describe('HTTP', function() {
  it ('should listen on port correctly', function(done) {
    var http = new HTTP();
    var app = sand(sandConfig).use(http);

    http.on('listening', function() {
      app.shutdown(done);
    });

    app.start();
  })
});