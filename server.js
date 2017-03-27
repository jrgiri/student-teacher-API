var express 	= require('express');
var app         = express();
var path 		= require('path');
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');

var index = require('./app/routes/index');
var user = require('./app/routes/user');


var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var User   = require('./app/models/user'); // get our mongoose model

var port = process.env.PORT || 8080;
mongoose.connect(config.database); // connect to database

var db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error'));
db.on('open', function(){
	console.log('DB connected');
});

app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use('/', index);
//app.use('/users', user);
app.route('/student/signUp').post(user.studentSignUp);
app.route('/teacher/signUp').post(user.teacherSignUp);
app.route('/students').get(user.students);
app.route('/teachers').get(user.teachers);
app.route('/signin').post(user.login);

app.listen(port);
console.log('Server started at http://localhost:' + port);
