const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "𝙰𝚂𝙸𝚃𝙷𝙰-𝙼𝙳=WYM0yCBY#XR9a-z0RXdErgA5YA7U8J42uSS4HdVYKpmD-Xihu3Lo",
MONGODB: process.env.MONGODB || "mongodb+srv://Kushan:1234@cluster0.kgci8.mongodb.net/",//enter mongo db url
};
