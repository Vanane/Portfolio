const db = require("./database");

var projects = []; 

initProjects();

async function initProjects()
{    
    res = await db.getProjects();

    res.forEach(el =>
    {
        projects.push(newProject(el));
    });
}


function getProjects()
{
    return projects;
}


function getProject(id)
{
    return projects.find(el => el.id == id);
}


function newProject(row)
{
    return {
        "id":row[0],
        "name":row[1],
        "link":row[2],
        "description":row[3]
    };
}


async function addProject(name, description, link)
{
    projects.push(newProject(await db.addProject(name, description, link)));
    return projects[projects.length - 1];
}


function modifyProject(project)
{
    var i = projects.findIndex(el => el.id == project.id);
    if(i > -1)
    {
        db.modifyProject(project);
        projects[i].name = project.name;
        projects[i].description = project.description;
        projects[i].link = project.link;
        return projects[i];
    }
    else
        return addProject(project.name, project.description, project.link);
}


module.exports =
{
    getProjects,
    getProject,
    addProject,
    modifyProject
} 

