var express  = require('express');
var routes  =   require('./app/routes.js');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');


//mongoose.connect('mongodb://localhost:27017/fccvotingapp');
//mongoose.connect('mongodb://localhost:27017/fccvotingapp');
mongoose.connect('mongodb://back1:L4ARx93LZXIqzp81@ds033036.mlab.com:33036/fcc_backend1');

require('./app/config/passport')(passport); // pass passport for configuration

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
//app.use('/views', express.static(process.cwd() + '/views'));
app.use("/views", express.static(__dirname + '/views'));
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
//app.use("/controllers", express.static(__dirname + '/controllers'));
app.use('/common', express.static(process.cwd() + '/app/common'));
//app.use("/common", express.static(__dirname + '/common'));
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
//require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
routes(app, passport);

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
