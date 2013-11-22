
var chai = require('chai'),
    should = chai.should();

describe('mongoload', function () {
  it('should not crash when required', function (done) {
    should.not.throw(function () {
      require('../.');
      done();
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
});
