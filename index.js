// Required NPM Libraries
require('dotenv').config();
const Express = require('express')
const ejsLayouts = require("express-ejs-layouts");
//require all middlewae for pp / authentication 
// npm install helmet,morgan,passport,and custom middlewae,express-seeions,sequilize seessions, flash
const helmet =require('helmet');
const session = require("express-session");
const flash = require("flash");



// App Set UP
const app = Express();
app.use(Express.urlencoded({extended: false}));
app.use(Express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(require('morgan')('dev'));
app.use(helmet());

// ROUTES
app.get('/', function(req, res) {
    // Check to see the user is logedin 
    res.render('index');
})

// initialize App on Port
app.listen(process.env.PORT || 3000, function() {
    console.log(`Listen to the smooth sweet sound of port ${process.env.PORT} in the morning 🦊 `)
});