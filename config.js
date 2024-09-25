const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "5i9AhT5I#DwXEt6KNVQJRubMrO9icQTP-APq72hpusCl1Rjvr970",
MONGODB: process.env.MONGODB || "",//enter mongo db url
};
