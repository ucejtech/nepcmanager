var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/', (req,res) => {
	res.status(200).
	render('landingpage');

});


function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('error_msg', 'You are not logged in.');
        res.redirect('/users/login');
  
    }
}

router.get('/about', (req, res) => {
  res.status(200).json({message: 'welcome to the about us page.'});
  console.log('about page');
});

router.get('/contact_us', (req, res) => {
  res.status(200).json({message: 'welcome to the contact page.'});
});


module.exports = router;
