var express = require('express');
const passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log("session id : " + req.sessionID)
	res.render('index', { title:'Le Vanane'});
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


module.exports = router;
