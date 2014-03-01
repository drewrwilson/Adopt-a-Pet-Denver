var request = require('request');
var restify = require('restify');
var chalk = require('chalk');

var server = restify.createServer({
    name: 'adoptDenver',
    version: '0.0.1'
});

var regexp = new RegExp(/ID=([^&]+)/gi); // id
var regexpTwo = new RegExp(/<font\ class="Title">*([^&]+)/gi); // name 
var regexpThree = new RegExp(/[^</font>][^&]+[^<BR>]/g); // ?
var regexpFour = new RegExp(/<\/font>(.+?)<BR><br>/g); // desc
var regexpFive = new RegExp(/[^<\/font>](.+?)+[^<BR><br>]/g); // desc
var bodyRegex = new RegExp(/[^<body></body>](.?)+[^</body>]/g);
var stringRegExp; // desc

var name, desc, _id;

var _id = undefined;
var idParams = [];

var endpoint = 'http://www.petharbor.com/petoftheday.asp?shelterlist=%27DNVR%27&imgwid=160&imght=120&imgname=POD&bgcolor=FFFFFF&fgcolor=000000&type=dog&border=0&availableonly=1&SEQ=0&SHOWSTAT=1&fontface=arial&fontsize=2&noclientinfo=0&bigtitle=1&source=results';

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.fullResponse());

//  CORS
restify.CORS.ALLOW_HEADERS.push('accept');
restify.CORS.ALLOW_HEADERS.push('sid');
restify.CORS.ALLOW_HEADERS.push('lang');
restify.CORS.ALLOW_HEADERS.push('origin');
restify.CORS.ALLOW_HEADERS.push('withcredentials');
restify.CORS.ALLOW_HEADERS.push('x-requested-with');
server.use(restify.CORS());

server.get('/', function(req, res) {

    request(endpoint, function(err, req, body) {
        errorHandler(err);
        var _body = body;
        idParams = regexp.exec(_body);
        _id = idParams[1];
        stringRegExp = "[^" + _id + "<BR><BR><\/font>][^<BR><br>]"
        regexpSix = new RegExp(stringRegExp, "g");

        var endpointTwo = 'http://www.petharbor.com/detail.asp?ID=' + _id + '&LOCATION=DNVR&searchtype=rnd&shelterlist=%27DNVR%27&where=dummy&kiosk=1';

        request(endpointTwo, function(err, req, body) {
            errorHandler(err);
            var _body = body;
            var nameParams = regexpTwo.exec(_body);
            
            var name = nameParams[1];

            var stringRegExp = _id + "<BR><BR><\/font>(.*?)<BR><br>";
            var regexpSeven = new RegExp(stringRegExp, "g");

            var responseBody = regexpSeven.exec(_body);
            var desc = responseBody[1];
            desc = desc.replace(/<BR><BR>/, " ").replace(/<BR><BR>/, " ");
            // payload for request
            var animaldata = {
                name: name,
                pic: "http://www.petharbor.com/get_image.asp?RES=detail&ID=" + _id + "&LOCATION=DNVR",
                id: _id,
                desc: desc
            };
            res.send(animaldata);
            res.end();
        });
    });
});

var errorHandler = function(e){
    // if (e) return next(e) ;
    if (e) return next(new restify.InvalidArgumentError(JSON.stringify(e.errors)));
}

var port = process.env.PORT || 8080;
server.listen(port, function() {
    console.log('%s listening at %s', server.name, server.url);
})
