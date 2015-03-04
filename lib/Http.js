"use strict";

/**
 * Module Dependencies
 */
var SandGrain = require('sand-grain');
var _ = require('lodash');
var errors = require('common-errors');
var fs = require('fs');
var domain = require('domain');
var sanitize = require('sanitize');
var bodyParser = require('body-parser');
var koa = require('koa');

// Load Generator Bind PolyFill
require('generator-bind').polyfill();

/**
 * Expose `HTTP`
 */
class Http extends SandGrain {
  constructor() {
    super();

    this.defaultConfig = require('./defaultConfig');
    this.version = require('../package').version;

    this.app = null;
    //this.express = null;
    this.server = null;
    this.routes = {};
    this.controllers = {};
    this.policies = null;

    this.time = {
      numRequests: 0,
      total: 0,
      avg: 0,
      min: 0,
      max: 0
    };

    this.socketId = 0;
    this.sockets = {};

    //this.logRoute = this.log.as('http:route');
    //this.logPolicy = this.log.as('http:policy');
  }

  init(config, done) {
    super.init(config);

    var self = this;

    // Create Koa App
    this.app = koa();

    // Add Request Logger
    this.app.use(require('./middleware/logRequestTime')(this));

    //TEST
    this.app.use(function *(next) {
      let self = this;
      yield new Promise(function(resolve) {
        setTimeout(function() {
          self.body = 'Done';
          resolve();
        }.bind(this), 3000);
      });
    });

    // Start Koa and Listen
    this.app.listen(this.config.port, listening.bind(this));

    function listening() {
      this.log(`Listening on ${this.config.port}`);
      this.emit('listening');
      done();
    }
  }

  shutdown(done) {
    super.shutdown();

    done();
  }
}

module.exports = Http;