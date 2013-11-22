
var glob = require('glob');

exports.bind = function (mongoose) {
  this.mongoose = mongoose;
  return this;
};

exports.load = function (options) {
  var self = this;
  options = options || {};

  if (!options.pattern) {
    throw new Error('You must specify a model matching pattern! E.g. "models/*.js"');
  }

  glob.sync(options.pattern).forEach(function (file) {
    var model = require(file);
    model(self.mongoose);
  });

  return this;
};
