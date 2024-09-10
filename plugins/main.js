const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')
const os = require("os")
const {runtime} = require('../lib/functions')
const config = require('../config')

cmd({
    pattern: "setting",
    desc: "Check bot setting.",
    react: "⚙️",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let setting = `
*╭──────────────●●►*
 *𝙰𝚂𝙸𝚃𝙷𝙰-𝙼𝙳 𝚂𝙴𝚃𝚃𝙸𝙽𝙶𝚂* ⚙️
*╰──────────────●●►*
*╭───────────────────●●►*
*│◈ ALIVE_IMG:* .update ALIVE_IMG: Imgurl 

*│◈ ALIVE_MSG:* .update ALIVE_MSG: Hello , I am alive now!!

*│◈ PREFIX:* .update PREFIX: .

*│◈ AUTO_READ_STATUS:* .update AUTO_READ_STATUS: true

*│◈ MODE:* .update MODE: public

*│◈ AUTO_VOICE:* .update AUTO_VOICE: true

*│◈ AUTO_STICKER:* .update AUTO_STICKER: true

*│◈ AUTO_REPLY:* .update AUTO_REPLY: true

*│◈ ANTI_BAD_WORD:* .update ANTI_BAD_WORD: true

*│◈ ANTI_LINK:* .update ANTI_LINK: true

*│◈ WELCOME_GOODBAY:* .update WELCOME_GOODBAY: true

*│◈ ALLWAYS_OFFLINE:* .update ALLWAYS_OFFLINE: false

*│◈ READ_CMD:* .update READ_CMD: true

*╰──────────────────●●►*

> POWERED by ASITHA-MD
`;

return await conn.sendMessage(from,{text:setting },{quoted: mek})

}catch(e){
console.log(e)
reply(`${e}`)
}
})
// 𝚛𝚎𝚙𝚘
cmd({
    pattern: "repo",
    desc: "bot repo",
    react: "🤖",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const config = await readEnv();
let repo =`
*╭──────────────●●►*
*| 𝙾𝚆𝙽𝙴𝚁 𝙽𝚄𝙼𝙱𝙴𝚁:* 94789123880 
*| 𝙰𝚂𝙸𝚃𝙷𝙰-𝙼𝙳 𝚁𝙴𝙿𝙾:* https://github.com/ASITHA-MD/ASITHA-MD
*| 𝙱𝙾𝚃 𝚄𝙿𝙳𝙴𝚃𝙰 𝙽𝙴𝚆𝚂 :* https://whatsapp.com/channel/0029VaeyMWv3QxRu4hA6c33Z
*╰──────────────●●►*
> *POWERED by ASITHA-MD*
`
await conn.sendMessage(from, { text: repo ,
  contextInfo: {
    mentionedJid: [ '' ],
    groupMentions: [],
    forwardingScore: 999,
    isForwarded: false,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363232588171807@newsletter',
      newsletterName: "𝗔𝗦𝗜𝗧𝗛𝗔-𝗠𝗗 ☠️",
      serverMessageId: 999
    },
externalAdReply: { 
title: '𝗔𝗦𝗜𝗧𝗛𝗔-𝗠𝗗 ☠️',
body: `${pushname}`,
mediaType: 1,
sourceUrl: "https://github.com/ASITHA-MD/ASITHA-MD" ,
thumbnailUrl: "https://imgtr.ee/images/2024/09/10/b4114bd9c3e9b83985d354348e4938b0.jpeg" ,
renderLargerThumbnail: true,
showAdAttribution: true
}
}}, { quoted: mek})}catch(e){
console.log(e)
reply(`${e}`)
}
});

cmd({
    pattern: "system",
    desc: "Check runtime, owner & more...",
    category: "main",
    react: "🛠️",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let status = `*┌───────────────────────*
*├* ⏰ *Runtime:-* ${runtime(process.uptime())}
*├* 📟 *Ram usage:-* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*├*⚙️ *Platform:-* ${os.hostname()}
*├* 👨‍💻 *Owners:-* Asitha
*├* 🧬 *Version:-* 1.0
*└───────────────────────*

> POWERED by ASITHA-MD
`

return reply(`${status}`)

}catch(e){
console.log(e)
reply(`${e}`)

}
});
cmd({
    pattern: "ping",
    desc: "Check bot's response time.",
    category: "main",
    react: "✈️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const startTime = Date.now()
        const message = await conn.sendMessage(from, { text: '*⏳𝗣𝗶𝗻𝗴𝗶𝗻𝗴...*' })
        const endTime = Date.now()
        const ping = endTime - startTime
        await conn.sendMessage(from, { text: `*✈️ 𝗥𝗲𝘀𝗽𝗼𝗻𝘀𝗲 𝗧𝗶𝗺𝗲 : ${ping}ms*`}, { quoted: message })
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
});

cmd({
    pattern: "alive",
    desc: "Check bot online or no.",
    react: "🛠️",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const voice = {
    alive: 'https://github.com/athulakumara604/ASITHA-MD-DATABASE/raw/main/Alivevoice/0909.MP3'
}
const config = await readEnv();
const aliveMsg = config.ALIVE_MSG 
let aliveMessage = ` 
*HELLO* ${pushname}

*╭─「 ALIVE」*
*│◈ 𝚁𝚄𝙽𝚃𝙸𝙼𝙴 -* ${runtime(process.uptime())}
*│◈ 𝚁𝙰𝙼 𝚄𝚂𝙰𝙶𝙴 -* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*╰──────────●●►*
*╭──────────●●►*
*│ 𝚄𝙿𝙳𝙰𝚃𝙴 𝙲𝙷𝙰𝙽𝙿𝙾𝙽𝙴𝙻:* https://whatsapp.com/channel/0029VaeyMWv3QxRu4hA6c33Z 
*│*
*│ 𝙶𝙸𝚃𝙷𝚄𝙱:* https://github.com/ASITHA-MD/ASITHA-MD
*╰──────────●●►*

${aliveMsg}

> *POWERED by ASITHA-MD*
`

await conn.sendMessage(from, { audio: { url: voice.alive }, mimetype: 'audio/mp4', ptt: true }, { quoted: mek })

await conn.sendMessage(from, { text: aliveMessage ,
  contextInfo: {
    mentionedJid: [ '' ],
    groupMentions: [],
    forwardingScore: 999,
    isForwarded: false,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363232588171807@newsletter',
      newsletterName: "𝗔𝗦𝗜𝗧𝗛𝗔-𝗠𝗗 ☠️",
      serverMessageId: 999
    },
externalAdReply: { 
title: '𝗔𝗦𝗜𝗧𝗛𝗔-𝗠𝗗 ☠️',
body: `${pushname}`,
mediaType: 1,
sourceUrl: "https://whatsapp.com/channel/0029VaeyMWv3QxRu4hA6c33Z" ,
thumbnailUrl: config.ALIVE_IMG ,
renderLargerThumbnail: true,
showAdAttribution: true
}
}}, { quoted: mek})
}catch(e){
console.log(e)
reply(`${e}`)
}
});
