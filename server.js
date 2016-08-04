var express = require('express');
var app = express();
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('client/build'));

var url = 'mongodb://localhost:27017/flightr';

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
});

var server = app.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
})