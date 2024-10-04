const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "𝙰𝚂𝙸𝚃𝙷𝙰-𝙼𝙳=CZs2GAja#2j7q6GMZj5-AvBOvnkHoxq9X8ArsGFwMjw5jkdT6WVQ",
MONGODB: process.env.MONGODB || "mongodb+srv://Kushan:1234@cluster0.kgci8.mongodb.net/",//enter mongo db url
};
