var express = require('express');
var app         = express();

app.get('/', function(req, res) {
	res.send('Hello! The API is running');
});

module.exports = app;
