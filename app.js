// https things
var createError = require('http-errors');
const https = require('https');
const hsts = require('hsts');
var express_enforces_ssl = require('express-enforces-ssl');

// auth things
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const uuid = require('uuid').v4;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// other things
const fs = require('fs');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const { Pool } = require('pg');

// custom modules
const config = require("./config");
const db = require("./model/database");
const projectRepo = require("./model/projectRepository");
const userRepo = require("./model/userRepository");


const pool = new Pool({
	host: 'localhost',
	user: config.getParam("dbLogin"),
	password: config.getParam("dbPassword"),
	database:'portfolio',
	max: 20,
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 5000,
});

var app = express();


// hsts & ssl
app.use(hsts({
	maxAge: 31536000,				// Must be at least 1 year to be approved
	includeSubDomains: true, // Must be enabled to be approved
	preload: true
}))

app.use(express_enforces_ssl());


// configure passport, for retrieving sessions from db
passport.use(new LocalStrategy({ usernameField: 'email' },
	(email, password, done) => {
		/*
		const validUser = userRepo.checkUserPassword(email, password);
		if(validUser)
		{
			const user = userRepo.getUserFromEmail(email)
			console.log('Local strategy returned true')
			return done(null, user)
		}
		else
		{
			return done(null, false, { message:"Invalid credentials." });
		}
		
		*/
		const userValid = db.checkUserPassword(email, password);

		if(userValid)
		{
			const user = userRepo.getUserFromEmail(email);
			console.log('Local strategy returned true')
			return done(null, user)
		}
		else
		{
			return done(null, false, { message:"Invalid credentials." });
		}
	}
));


// tell passport how to serialize the user
passport.serializeUser((user, done) => {
	console.log('Inside serializeUser callback. User id is save to the session file store here')
	done(null, user.id);
  });
  
passport.deserializeUser((id, done) => {
	const user = userRepo.getUserFromId(id);
	done(null, user ? user : false);
});

	
// module for parsing POST body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// configure express-session for creating sessions
app.use(session({
	genid: (req) => {
		console.log(req.sessionID)
		return uuid() // use UUIDs for session IDs
	},
	store: new (require('connect-pg-simple')(session))(
		{
			pool:pool
		}),
	secret: 'changer pour une var de prod',
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
}))


// Passport overrides some of epxress-session's stuff, so we add it after
app.use(passport.initialize());
app.use(passport.session());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// routes
var indexRouter = require('./routes/index');
var cvRouter = require('./routes/cv');
var projectsRouter = require('./routes/projects');
var aboutRouter = require('./routes/about');
var adminRouter = require('./routes/admin');
var apiRouter = require('./routes/api');

app.use('/', indexRouter);
app.use('/cv', cvRouter);
app.use('/projects', projectsRouter);
app.use('/about', aboutRouter);
app.use('/admin', adminRouter);
app.use('/api', apiRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});


module.exports = app;
