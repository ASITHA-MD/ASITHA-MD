const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "𝙰𝚂𝙸𝚃𝙷𝙰-𝙼𝙳=f64lhDAK#aAGMY5txigxroLlHbvHf2rbcL8I68A28eRBLZBnAicE",
MONGODB: process.env.MONGODB || "",//enter mongo db url හදන විදිය පල්ලෙහාබටන් එකක් ඇති
};
