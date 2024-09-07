const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "iItkhBwS#cO4lTDkx06a0lCurC38tS1gMIBDASowDf3ZtABpHbwY",
MONGODB: process.env.MONGODB || "94742223168",//enter mongo db url
};
