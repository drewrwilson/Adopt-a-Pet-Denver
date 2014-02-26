var request = require('request');
var restify = require('restify');

var server = restify.createServer({
    name: 'myapp',
    version: '1.0.0'
});

var regexp = new RegExp(/ID=([^&]+)/gi);
var id  = undefined;
var  idParams = [];

var endpoint = 'http://www.petharbor.com/petoftheday.asp?shelterlist=%27DNVR%27&imgwid=160&imght=120&imgname=POD&bgcolor=FFFFFF&fgcolor=000000&type=dog&border=0&availableonly=1&SEQ=0&SHOWSTAT=1&fontface=arial&fontsize=2&noclientinfo=0&bigtitle=1&source=results';
var endpointTwo;

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/', function(req, res) {
	request(endpoint, function(err, req ,body){
		if(err) throw err;
		var body=  req.body;
		// console.log(req.body);
		idParams  = regexp.exec(body);
		id = idParams[1];

		endpointTwo = 'http://www.petharbor.com/detail.asp?ID=' + id + '&LOCATION=DNVR&searchtype=rnd&shelterlist=%27DNVR%27&where=dummy&kiosk=1';
		console.log(endpointTwo);

		res.end(endpointTwo);
	});
	
});

server.listen('8080', function() {
    console.log('%s listening at %s', server.name, server.url);
})
