var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var	usersSchema = new Schema({
		name: {
			type: String,
		},

		password: {
			type: String,
		},

		email: {
			type: String,
		},

		roles:{
			type: String,

		} },

		{timestamps: true});

var User = mongoose.model('User', usersSchema);
module.exports = User;