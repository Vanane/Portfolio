const db = require("./database");

var users = []; 

initUsers();

async function initUsers()
{    
    console.log("init users");
    res = await db.getUsers();

    res.forEach(el =>
    {
        users.push(newUser(el));
    });
    console.log(`${users.length} users in db.`);
}


function getUsers()
{
    return users;
}


function getUserFromId(id)
{
    return users.find(el => el.id == id);
}


function getUserFromEmail(email)
{
    return users.find(el => el.email == email);
}

function newUser(row)
{
    return {
        "id": row[0],
        "email": row[1],
        "password": row[2]
    };
}


function checkUserPassword(email, pwd)
{
    return db.checkUserPassword(email, pwd);
}


module.exports =
{
    getUsers,
    getUserFromId,
    getUserFromEmail,
    checkUserPassword
} 

