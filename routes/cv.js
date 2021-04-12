var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/cv', function(req, res, next) {
  res.send('cv');
});

module.exports = router;
