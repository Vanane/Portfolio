var express = require('express');

const repository = require("../model/projectRepository");

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	projectList = repository.getProjects();
	res.render('projects', { title : "My projects", projects : projectList } );
});


router.get('/:id', function(req, res, next) {
	p = repository.getProject(req.params.id);
	res.render('project', {project : p});
});

module.exports = router;


