var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title:'Le Vanane', hometext: 'Welcome to my portfolio !' });
});

module.exports = router;
