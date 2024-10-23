const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "𝙰𝚂𝙸𝚃𝙷𝙰-𝙼𝙳=zqJ2SbwA#Anz_hsLq41KLJ9V9Ilp2cjjytjFfdn-vteqD91W3Rco",
MONGODB: process.env.MONGODB || "https://wa.me/qr/L2UEFP26UQB4J1",//enter mongo db url හදන විදිය පල්ලෙහාබටන් එකක් ඇති
};
