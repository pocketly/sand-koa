"use strict";

module.exports = function(app) {

  return function *(next) {
    var startTime = new Date();
    yield *next;

    let ms = new Date() - startTime;

    var time = ms < 1000 ? `${ms}ms` : `${(ms/1000).toFixed(2)}s`;

    app.log(`${this.method} (${time}): ${this.url}`);
  };

};