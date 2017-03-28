var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require ('mongoose');
var crypto = require('crypto');
var jwt    = require('jsonwebtoken');
var uuid = require('node-uuid');
var User = require('../models/user');

var user = express.Router();
user.use(bodyParser.json());

exports.students = function (req, res) {
	User.find({roles:'student'}, function(err, user){
		if (err) throw err;
		res.json(user);
	});
};

exports.teachers = function (req, res) {
	User.find({roles:'teacher'}, function(err, user){
		if (err) throw err;
		res.json(user);
	});
};

exports.studentSignUp = function (req, res) {
    var data = req.body;
	data.password= crypto.createHash('md5').update(data.password).digest("hex");
	console.log("pwd"+data.password);
	data.roles='student';
	User.find({email:data.email}, function(err, user){
		if(user && user.length>0){
			res.send(401, {error: 'email id already registered'});
		}else{
			User.create(data, function(err, user){
				if (err) throw err;
				console.log('User Added');
				var id = user._id;
				res.end('Added User'+id);
			});
		}
	});
	
};

exports.teacherSignUp = function (req, res) {
    var data = req.body;
	data.password= crypto.createHash('md5').update(data.password).digest("hex");
	console.log("pwd"+data.password);
	data.roles='teacher';
	User.find({email:data.email}, function(err, user){
		if(user && user.length>0){
			res.send(401, {error: 'email id already registered'});
		}else{
				User.create(data, function(err, user){
				if (err) throw err;
				console.log('User Added');
				var id = user._id;
				res.end('Added User'+id);
			});
		}
	});
};
	
exports.login = function (req, res) {
    var email=req.body.email;
    var password = req.body.password;
	var pwd = crypto.createHash('md5').update(password).digest("hex");
	User.find({email:email,password:pwd}, function(err, user){
		if (err) {
			throw err;
		}else if(user && user.length<1){
			res.send(401, {error: 'Invalid user name or password'});
		}else{
			var userObject = {
				name: user[0].name || '',
				email:user[0].email || '',
				role: user[0].roles || ''
			}
			var token = uuid.v4();

			res.json({
				user:userObject,
				token:token
			});
		}
		
	});
};