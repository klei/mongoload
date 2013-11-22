
var chai = require('chai'),
    should = chai.should(),
    mongoload = null;

describe('mongoload', function () {
  it('should not crash when required', function (done) {
    should.not.throw(function () {
      mongoload = require('../.');
      done();
    });
  });

  describe('load', function () {

    it('should crash when given no pattern', function () {
      should.throw(function () {
        mongoload.load();
      });
    });

    it('should require and initialize all models from file pattern', function (done) {
      var called = 0;
      var mongoose = {
        loaded: function () {
          if (++called === 2) {
            done();
          }
        }
      };
      require('../.')
        .bind(mongoose)
        .load({
          pattern: __dirname + '/testmodels/*.js'
        });
    });

    it('should give the model name to the model on initialization', function (done) {
      var mongoose = {
        loaded: function (mongoose, name) {
          name.should.equal('model1');
          done();
        }
      };
      require('../.')
        .bind(mongoose)
        .load({
          pattern: __dirname + '/testmodels/model*.js'
        });
    });

    it('should be able to extract model name from filename via provided regexp', function (done) {
      var mongoose = {
        loaded: function (mongoose, name) {
          name.should.equal('Another');
          done();
        }
      };
      require('../.')
        .bind(mongoose)
        .load({
          pattern: __dirname + '/testmodels/*Model.js',
          nameRegExp: /([^\/\\]+)Model.js$/
        });
    });
  });
});
