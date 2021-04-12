const fs = require('fs');
const { Client } = require('pg');
const config = require("../config");
var client = undefined;

initDb();

function initDb()
{
    connect();
    client.connect();
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
}

async function getProjects()
{
    var results = await client.query({
        text : "SELECT * FROM Project;",
        rowMode:"array"
    });

    return results.rows;
}


module.exports =
{
    initDb, getProjects
}
