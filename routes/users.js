var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var auth = require('./dashboard').ensureAuthenticated;

var User = require('../models/user');

// Register
router.get('/register', (req, res) => {
	res.status(200).
	render('registerform');
	

});


// GET Login
router.get('/login', (req, res) =>{
	res.status(200).
	render('loginform');
	
});

// Register Users
router.post('/register', (req, res) => {
  var fullname = req.body.fullname;
	var username = req.body.username;
	var email = req.body.email;
	var password = req.body.password;
// 	var password2 = req.body.password2;

// Validation
	req.checkBody('fullname', 'Please provide Fullname').notEmpty();
	req.checkBody('username', 'Username cannot be empty.').notEmpty();
	req.checkBody('email', 'Email cannot be empty.').notEmpty();
	req.checkBody('password', 'Password should not be less than 6 characters').len(6);
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
	


	var errors = req.validationErrors();


	if (errors) {
		console.log(errors);
		res.status(400).render('registerform', {
			errors:errors
		});
	} else {
		var newUser = new User({
		  fullname: fullname,
			username: username,
			email: email,
			password: password,
		});

		User.createUser(newUser, (err, user) => {
			if(err) throw err;
			console.log(user);
			console.log("Registration successful");
		});
		req.flash('success_msg', 'Registration Successful. Please Login.');

		res.status(201).redirect('/users/login');
	}
});

// local strategy
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user){
            return done(null, false, {message: 'No account associated with that username'});
        }
        
    User.comparePassword(password, user.password, (err, isMatch) => {
        if(err) throw err;
        if(isMatch){
            return done(null, user);
        } else {
            return done(null, false, {message: 'Invalid Password.'})
        }
    });
   });
}));

// serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserialize user
passport.deserializeUser((id, done) => {
  User.getUserById(id, (err, user) => {
    done(err, user);
  });
});

router.post('/login', passport.authenticate('local', {successRedirect:'/dashboard', failureRedirect:'/users/login', failureFlash: true}),
    function(req, res) {
        res.redirect('/dashboard');
});


// Update Profile
router.post('/editProfile', function(req, res, next){

    User.findById(req.user.id, function (err, user) {

        // todo: don't forget to handle err

        if (err) throw err;
        if (!user) {
            req.flash('error', 'No account found');
            return res.redirect('/dashboard/profile');
        }

        // good idea to trim 
        var email = req.body.email.trim();
        var fullname = req.body.fullname.trim();
        var username = req.body.username.trim();
        var address = req.body.address.trim();
        var city = req.body.city.trim();
        var team = req.body.team.trim();


        // validate 
        if (!email || !username || !fullname) { 
            req.flash('error_msg', 'One or more fields are empty');
            return res.redirect('/users/profile'); // modified
        }

        
        user.email = email;
        //user.local.email = email; 
        user.fullname = fullname;
        user.username = username;
        user.address = address;
        user.city = city;
        user.team = team;

        // don't forget to save!
        user.save(function (err) {

        	if (err) throw err;
        	req.flash('success_msg', 'Profile Updated!')
            // todo: don't forget to handle err
            res.redirect('/dashboard/profile');
        });
    });
});

// logout user
router.get('/logout', (req, res) => {
    req.logout();
    
    req.flash('success_msg', 'You are now logged out.');
    
    res.redirect('/users/login');
});


module.exports = router;











