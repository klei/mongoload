
var glob = require('glob'),
    path = require('path');

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
    var model = require(file),
        name = getModelName(file, options.nameRegExp);
    model(self.mongoose, name);
  });

  return this;
};

/**
 * Get model name
 *
 * Gets the model name from a filename
 * If `extractorRegExp` is provided and it matches
 * the filename, the first match group will be returned.
 * Otherwise the filename without extension will be returned.
 *
 * Example 1:
 *  file: /var/tmp/super.model.js
 *  extractorRegExp: /([^\/\\]+).model.js$/
 *  Returns: "super"
 *
 * Example 2:
 *  file: /var/tmp/models/super.js
 *  extractorRegExp: NULL
 *  Returns: "super"
 *
 * @param {String} file
 * @param {RegExp} extractorRegExp
 * @returns {String}
 */
function getModelName (file, extractorRegExp) {
  var name = extractorRegExp ? file.match(extractorRegExp)[1] : null;
  return name || path.basename(file).slice(0, -path.extname(file).length);
}
