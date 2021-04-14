const fs = require('fs');
const { Client, Query } = require('pg');
const app = require('../app');
const config = require("../config");
var client = new Client();

initDb();

function initDb()
{
    connect();
    script = fs.readFileSync("./bin/sql/portfolio.sql", {"encoding":"utf8", "flag":"r"} );
    client.query(script);
}


function connect()
{
    client = new Client({
        user: config.getParam('dbLogin'),
        host: 'localhost',
        password : config.getParam('dbPassword'),
        database:"portfolio"
    });
    client.connect();
}


async function getProjects()
{
    var results = await client.query({
        text : "SELECT * FROM Project;",
        rowMode:"array"
    });

    return results.rows;
}


async function getUsers()
{
    var results = await client.query({
        text : "SELECT * FROM WebUser;",
        rowMode:"array"
    });

    return results.rows;
}


async function checkUserPassword(email, pwd)
{
    var results = await client.query(
        {
            text:"SELECT 1 FROM WebUser WHERE email = $1 AND password = crypt($2, password);",
            values:[email, pwd],
            rowMode: "array"
        }
    );
    console.log(results.rows);
    return results.rows[0] == 1 ? true : false;
}


async function addUser(email, pwd)
{
    await client.query(
        {
            text:"INSERT INTO WebUser(email, password) VALUES ($1, crypt($2, gen_salt('bf')));",
            values:[email, pwd]
        }
    );
    return;
}


module.exports =
{
    initDb,
    
    getProjects,

    getUsers,
    checkUserPassword,
    addUser
}
