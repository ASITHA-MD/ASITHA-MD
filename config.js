const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "KEk3wY5B#qbOvDqU-NDsIXdV2HUqYCiLQEq3P8Xke63Gs-ZqwvXQ",
MONGODB: process.env.MONGODB || "",//enter mongo db url
};
