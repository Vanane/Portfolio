const db = require("./database");

var projects = []; 

initProjects();

async function initProjects()
{    
    res = await db.getProjects();

    res.forEach(el =>
    {
        projects.push(newProject(el));
        console.log(newProject(el));
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


module.exports =
{
    getProjects,
    getProject
} 

