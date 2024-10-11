const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "",
MONGODB: process.env.MONGODB || "𝙰𝚂𝙸𝚃𝙷𝙰-𝙼𝙳=yjZnSIJL#y_Sh2fpy78Y9SWVtOW5xa8VMz8r7HpEoHONoBHBsTqg",//enter mongo db url
};
