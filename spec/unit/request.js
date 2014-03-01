// list of jasmine matchers 
// https://github.com/pivotal/jasmine/wiki/Matchers

describe('web scrap request', function() {
    var chalk;
    var request;
    var firstEndPoint;

    beforeEach(function() {
        chalk = require('chalk');
        request = require('request');
        firstEndPoint = "rtests";
        // request('')
    });

    it('should be able to make first request for web scrapping', function() {
        expect(firstEndPoint).toBeDefined();
    });
});
