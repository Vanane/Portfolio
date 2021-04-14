var express = require('express');
const passport = require('passport');
const projectRepo = require("../model/projectRepository");
const userRepo = require("../model/userRepository");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	if(req.isAuthenticated())
		res.render("admin");
	else
		res.redirect("/");
});


router.get('/db', function(req, res, next) {
	if(req.isAuthenticated())
	{        
		res.render("admindb", { projects: projectRepo.getProjects(), users: userRepo.getUsers() });
	}
	else
		res.redirect("/");
});


router.get('/project/add', function(req, res, next) {
	if(req.isAuthenticated())
	{        
		res.render("addproject");
	}
	else
		res.redirect("/");
});


router.post('/project/add', function(req, res, next) {
	if(req.isAuthenticated())
	{
		console.log("body.id is : " + req.body.id);
		var project = projectRepo.getProjects(req.body.id);
		if(project)
		{
			project.name = req.body.name;
			project.description = req.body.description;
			project.link = req.body.link;

			projectRepo.modifyProject(project);
		}
		else
		{
			project = projectRepo.addProject(req.body.name, req.body.description, req.body.link);
		}
		res.redirect("../db");
	}
	else
		res.redirect("/");
});


router.get('/project/modify/:id', function(req, res, next) {
	if(req.isAuthenticated())
	{        
		res.render("addproject", { project: projectRepo.getProject(req.params.id) });
	}
	else
		res.redirect("/");
});


router.get('/project/delete/:id', function(req, res, next) {
	if(req.isAuthenticated())
	{        
		res.render("delproject", { projects: projectRepo.getProject(req.params.id) });
	}
	else
		res.redirect("/");
});


module.exports = router;
