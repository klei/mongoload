
var chai = require('chai'),
    should = chai.should();

describe('mongoload', function () {
  it('should not crash when required', function (done) {
    should.not.throw(function () {
      require('../.');
      done();
    });
  });
});
