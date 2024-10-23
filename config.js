const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "𝙰𝚂𝙸𝚃𝙷𝙰-𝙼𝙳=ryQ3mZaR#MEpSevvBu0Ir__fMFaXMLM9PS9dG4UWdOGi5Ww8GSh8",
MONGODB: process.env.MONGODB || "https://downloads.mongodb.com/compass/mongodb-compass-1.44.5-win32-x64.exe",
};
