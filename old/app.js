var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var LocalStratergy = require('passport-local').Strategy;
var passessionsport = require('express-session');
var expressValidator = require("express-validator");
var api = require('./routes/api');
var login = require('./routes/login');
var messages = require('./routes/messages');
var sessions = require('./routes/sessions');
var users = require('./routes/users');
var app = express();
var pgSession = require('connect-pg-simple')(session);

var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, withCredentials");
  res.header("x-forwarded-proto", "https");
  next();
}

app.use(allowCrossDomain);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express validator
app.use(expressValidator());

app.use(session({
  store: new pgSession({
      conString : 'postgres://billy:bcrid91@localhost:5432/application'
  }),
  secret: 'secret',
  saveUninitialized: true,
  resave: true,
  cookie: {
    maxAge: 90000000
  }
}));

// passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));
// app.get('/', function (req, res) {
//   console.log(__dirname+'/public/index.html');
//   res.sendFile(__dirname+'/public/index.html');
// });

// app.use('/', function(req, res, next) {
//   // Just send the index.html for other files to support HTML5Mode
//   res.sendFile('index.html', { root: __dirname+'/public/assets' });
// });

app.use('/app', function(req, res, next) {
  // Just send the index.html for other files to support HTML5Mode
  res.sendFile('index.html', { root: __dirname+'/public' });
});

app.use('/api', api);
app.use('/api', login);
app.use('/api', messages);
app.use('/api', users);
app.use('/api', sessions);

app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.userLoginData || null;
});



// --------------------------------
// --------------------------------
module.exports = app;
