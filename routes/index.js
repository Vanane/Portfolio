var express = require('express');
const passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { user: req.user ? req.user : false });
});


/* GET login page. */
router.get('/login', function(req, res) {
	console.log(req.sessionID)
	res.render("login");
});


/* POST login page page. */
router.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if(info) return res.render("login", { err : info.message });
		if(err) return next(err);
		if(!user) return res.redirect('/login');

		req.login(user, (err) =>
		{
			if (err) return next(err);
			return res.redirect('/');
		})
	})(req, res, next);
})


/* GET login page. */
router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});


/* GET a random picture, used for the background of the website. */
router.get('/randimage', function(req, res) {
	res.send(Math.random().toString());
	// add a table in db and images in the list, and get a random image from db
});

module.exports = router;
