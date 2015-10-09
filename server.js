var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.sendFile('nrdp.html', {root:'./public/html'});
});

var port=80;
app.listen(port, function(){
	console.log('server listening on port ' + port);
});