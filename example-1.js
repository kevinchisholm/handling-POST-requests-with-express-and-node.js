//reuire the express nodejs module
var express = require('express'),
	//set an instance of exress
	app = express(),
	//reuire the path nodejs module
	path    = require("path");

var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//tell express that www is the root of our public web folder
app.use(express.static(path.join(__dirname, 'www')));

//tell express what to do when the /about route is requested
app.post('/form',function(req, res){
	res.setHeader('Content-Type', 'application/json');

	//mimic a slow network connection
	setTimeout(function(){

		res.send(JSON.stringify({
			firstName: req.body.firstName || null,
			lastName: req.body.lastName || null
		}));

	}, 1000)

	// res.send(JSON.stringify({a: 1, b: 2}));
});

//wait for a connection
app.listen(3000, function () {
  console.log('Server is running. Point your browser to: http://localhost:3000');
});