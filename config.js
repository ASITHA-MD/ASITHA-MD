const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID |𝙰𝚂𝙸𝚃𝙷𝙰-𝙼𝙳=jmhiHT4A#10hLYFmajo-Xv4c3dOec1BwZSLU28vUMtJNKYJe63I0| "𝙰𝚂𝙸𝚃𝙷𝙰-𝙼𝙳=j
MONGODB: process.env.MONGODB || "mongodb+srv://kulathungaasitha319:yjHB0DvFfStNfwPS@cluster0.3oijd.mongodb.net/",//enter mongo db url
};
