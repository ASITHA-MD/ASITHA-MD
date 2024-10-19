const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "𝙰𝚂𝙸𝚃𝙷𝙰-𝙼𝙳=jjQF0ApL#Fl-r3ZwqfUyFdpRH4Rg1ompO4IEZd0EY0lUMhVFlcMo",
MONGODB: process.env.MONGODB || "mongodb+srv://nethminabhashitha194:lrQ8wjvt4YCF7q2c@cluster0.3wbcu.mongodb.net/"
};
