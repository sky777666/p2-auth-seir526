// Required NPM Libraries
require('dotenv').config();
const Express = require('express')
const ejsLayouts = require("express-ejs-layouts");
//require all middlewae for pp / authentication 
// npm install helmet,morgan,passport,and custom middlewae,express-seeions,sequilize seessions, flash
const helmet =require('helmet');
const session = require("express-session");
const flash = require("flash");
const passport = ('./config/ppConfig')
const db = require('.models')
// Want add a link to our customer middleware for isLoggedIn
const SequelizeStore = require('connect-session-sequelize')(session.Store)

// App Set UP
const app = Express();
app.use(Express.urlencoded({extended: false}));
app.use(Express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(require('morgan')('dev'));
app.use(helmet());

//create new instance f class sequelize store
const sessionStore = new SequelizeStore({
    db: db.sequelize,
    expiration: 1000 * 60 * 30
})

app.use(session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: true
}))

sessionStore.sync();

// Init and Link flash message and passport and session
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function(req, res, next) {
    res.locals.alert = req.flash();
    res.locals.currentUser = req.user;

    next();
});

// ROUTES
app.get('/', function(req, res) {
    // Check to see the user is logedin 
    res.render('index');
})

// include auth controller
app.use('/auth', require('./controllers/auth'));



// initialize App on Port
app.listen(process.env.PORT || 3000, function() {
    console.log(`Listen to the smooth sweet sound of port ${process.env.PORT} in the morning 🦊 `)
});