var hoxy = require('hoxy');

// list of jasmine matchers 
// https://github.com/pivotal/jasmine/wiki/Matchers

describe('web scrap request', function () {

  var request;
  var firstEndPoint;
  var proxy;

  beforeEach(function () {

    proxy = new hoxy.Proxy();
    proxy.listen(5050);
    // request = require('request');
    firstEndPoint = "tests";

  });

  it('should be able to make first request for web scrapping', function (done) {
    proxy.intercept('request', function (req, res) {
      console.log('request was made to: ' + req.fullUrl());
      expect(req.fullUrl()).not.toBeNull();
    });
    done();
  });
});
