const fs = require('fs')

const serverConfig = loadConfig();

function loadConfig()
{
    return JSON.parse(fs.readFileSync('./server.config', {"encoding":"utf8", "flag":"r"} ));
}


function getParam(param)
{
    var r;
    try
    {
        r = serverConfig[param];
    } 
    catch(e)
    {
        r = undefined;
    }
    return r;
}


module.exports =
{
    getParam
} 