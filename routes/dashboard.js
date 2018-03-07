var express = require('express');
var router = express.Router();


// GET dashboard
router.get('/', ensureAuthenticated, (req, res) => {
  res.status(200).
  render('dashboard');
})

// GET profile
router.get('/profile', ensureAuthenticated, (req,res) => {
    res.status(200).
    render('profile');

});

// GET project-list
router.get('/projects', ensureAuthenticated, (req,res) => {
    res.status(200).
    render('project-list');

});


// GET manage tasks and projects
router.get('/manage_projects', ensureAuthenticated, (req, res) => {
  res.status(200).
  render('manage-projects'); 
});

// GET teams
router.get('/teams', ensureAuthenticated, (req, res) => {
  res.status(200).
  render('teams');
});

// GET view-project
router.get('/view_project', ensureAuthenticated, (req, res) => {
  res.status(200).
  render('view-project');
})

function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } else {
        req.flash('error_msg', 'You are not logged in.');
        res.redirect('/users/login');
    }
}

module.exports = router;
