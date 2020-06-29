const express = require('express')
const router = express.Router();
const db = require('../models');
const flash = require('flash');

// import middleware
//register get route 
router.get('/register', function(req, res) {
    res.render('auth/register');
})
// register post route
router.post('/register', function(req, res) {
    db.user.findOrCreate({
        where: {
            email: req.body.email
        }, defaults: {
            name: req.body.name,
            password: req.body.password
        }
    }).then(function([user, created]) {
        // if user was created
        if (created) {
            console.log("User created ! 🌴 ")
            res.redirect("/")
        } else {
            console.log("User email already exists ⛑. ")
            res.flash('error', 'Error: email already exists for user. Try agian.');
            res.redirect('/auth/register');
        }
       
    }).catch(function(err) {
        console.log(`Error Found. \nMessage: ${err.message}. \nPlease review - ${err}`)
        req.flash('error', err.message);
        res.redirect('/auth/register');
    })
})
//login get route
router.get('/login', function(req,res) {
    res.render('auth/login');
})
//login post route

module.exports = router;