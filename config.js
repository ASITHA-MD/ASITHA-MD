const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : true;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "https://camo.githubusercontent.com/4a5f2a185ba8add838b82fdf3904bc8e5c0723b56f44c60099256a3e8d038977/68747470733a2f2f692e696d6775722e636f6d2f644261534b57462e676966",
MONGODB: process.env.MONGODB || "mongodb+srv://kulathungaasitha319:yjHB0DvFfStNfwPS@cluster0.3oijd.mongodb.net/",//enter mongo db url
};
