var express = require('express');
var GetItemName = require('../extensions/Vanane-item-Gen/main');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.json(
	{
		GetItemName:
		{
			description:"Generates a random (parodic) RPG item name, for all your RPG needs.",
			params:"none"
		}
	}	
	);
});


router.get("/GetItemName", function(req, res)
{
	res.json(
		{
			name: GetItemName()
		}
	);

});


module.exports = router;
