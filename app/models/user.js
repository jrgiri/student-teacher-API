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
<<<<<<< HEAD
/*usersSchema.pre("save",function(next, done) { 
	var self = this; mongoose.models["User"].findOne({email : self.email},function(err, email) {
	//  if(user) { self.invalidate("user","email must be unique"); } 
	//  done();
	// }); next();

	if(err) 
		{ done(err); } 
	else if(email) 
		{ self.invalidate("email", "email must be unique"); 
	done(new Error("email must be unique")); } 
	else { done(); } }); next();

});*/
=======
>>>>>>> c24771f5fa2047af1e0bedc55e6aa8ea11460268
module.exports = User;