const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;


// User Schema
var UserSchema = new Schema({

	company: {
		type: String,
		default: 'NEPC'
	},
  fullname: {
    type: String,
    unique: false,

  },
	username: {
		type: String,
		unique: true,
		index: true

	},
	password: {
		type: String

	},
	email: {
		type: String,
		unique: true
	},
	role: {
	  type: String,
	  unique: false,
	  default: 'Admin'
	  
	},
	address: {
		type: String,
		default: ''
	},
	city: {
		type: String,
		default: 'Abuja'
	},
	country: {
		type: String,
		default: 'Nigeria'
	},
	team: {
	  type: String,
	  unique: false,
	  default: 'Product Dept'
	},
	avatar: {
		type: String,
		default: '../assets/img/faces/marc.png'
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
	updatedAt: {
		type: Date,
		default: Date.now()
	}
});

// Export User Object
var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = (newUser, callback) => {
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(newUser.password, salt, (err, hash) => {
			newUser.password = hash;
			newUser.save(callback);
		});
	});
};

// getuser by username
module.exports.getUserByUsername = (username, callback) => {
    let query = {username: username};
    User.findOne(query, callback);
};

// getUser by email
module.exports.getUserByEmail = (email, callback) => {
  let query = {email: email};
  User.findOne(query, callback);
};

// get user by ID
module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
};


// compare passwords
module.exports.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
};











