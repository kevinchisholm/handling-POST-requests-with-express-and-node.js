//require the express nodejs module
var express = require('express'),
	//set an instance of exress
	app = express(),
	//require the body-parser nodejs module
	bodyParser = require('body-parser'),
	//require the path nodejs module
	path = require("path");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var stu_database;


//support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true })); 

//tell express that www is the root of our public web folder
app.use(express.static(path.join(__dirname, 'www')));

//tell express what to do when the /form route is requested
app.post('/student',function(req, res){
	res.setHeader('Content-Type', 'application/json');
	MongoClient.connect(url, function(err, db) {
  	if (err) throw err;
  	var dbo = db.db("mydb");
  	var myobj = { firstName: req.body.firstName ,lastName: req.body.lastName};
  	dbo.collection("student").insertOne(myobj, function(err, res) {
    console.log(res);
    db.close();
  });
}); 
	//mimic a slow network connection
	setTimeout(function(){

		res.send(JSON.stringify({
			firstName: req.body.firstName || null,
			lastName: req.body.lastName || null
		}));

	}, 1000)

	//debugging output for the terminal
	console.log('you posted: First Name: ' + req.body.firstName + ', Last Name: ' + req.body.lastName);
});
app.post('/faculty',function(req, res){
	res.setHeader('Content-Type', 'application/json');
	MongoClient.connect(url, function(err, db) {
  	if (err) throw err;
  	var dbo = db.db("mydb");
  	var myobj = { firstName: req.body.firstName ,lastName: req.body.lastName};
  	dbo.collection("faculty").insertOne(myobj, function(err, res) {
    console.log(res);
    db.close();
  });
}); 
	//mimic a slow network connection
	setTimeout(function(){

		res.send(JSON.stringify({
			firstName: req.body.firstName || null,
			lastName: req.body.lastName || null
		}));

	}, 1000)

	//debugging output for the terminal
	console.log('you posted: First Name: ' + req.body.firstName + ', Last Name: ' + req.body.lastName);
});


app.get('/studentdata', function (req, res) {
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  
  dbo.collection("student").find({},{_id:0}).toArray(function(err, result) {
    if (err) throw err;
    //res.setHeader('Content-Type', 'application/json');
    //res.send(result);
    console.log(result);
    res.setHeader('Content-Type','application/json');
    stu_database= result;
    db.close();
  });
  res.setHeader('Content-Type', 'application/json');
  res.send(stu_database);
});
})

app.post('/student_sorted',function(req, res){
	res.setHeader('Content-Type', 'application/json');
	//var myobj = req.body.name;
	MongoClient.connect(url, function(err, db) {
  	if (err) throw err;
  	var dbo = db.db("mydb");
  	var approx = "/"+req.body.name+"/"
  	var myobj = {firstName: approx};
	res.setHeader('Content-Type', 'application/json');
	console.log(myobj);
  	dbo.collection("student").find(myobj).toArray(function(err, result) {
    if (err) throw err;
    //res.setHeader('Content-Type', 'application/json');
    //res.send(result);
    console.log(result);
    res.setHeader('Content-Type','application/json');
    res.send(result);
    db.close();
  });
}); 
	//mimic a slow network connection
	// setTimeout(function(){

	// 	res.send(JSON.stringify({
	// 		firstName: req.body.firstName || null,
	// 		lastName: req.body.lastName || null
	// 	}));

	// }, 1000)

	//debugging output for the terminal
	console.log('you posted: Name: ' + req.body.name);
});

app.listen(3000, function () {
  console.log('Server is running. Point your browser to: http://localhost:3000');
});