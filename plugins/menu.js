const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
const {runtime} = require('../lib/functions')
const {readEnv} = require('../lib/database')
cmd({
    pattern: "menu",
    desc: "To get the menu.",
    react: "📃",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const config = await readEnv();
let menu = {
main: '',
download: '',
group: '',
owner: '',
convert: '',
search: '',
ai: '',
fun: '',
other: ''
};

for (let i = 0; i < commands.length; i++) {
if (commands[i].pattern && !commands[i].dontAddCommandList) {
menu[commands[i].category] += `*│●►*${config.PREFIX}${commands[i].pattern}\n`;
 }
}

let menumsg = `
*☠️ A S I T H A - M D ☠ -  LIST MENU ☠️*

   *HELLO* ${pushname}
*╭─「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ」*
*│◈ 𝚁𝙰𝙼 𝚄𝚂𝙰𝙶𝙴 -* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*│◈ 𝚁𝚄𝙽𝚃𝙸𝙼𝙴 -* ${runtime(process.uptime())}
*╰──────────●●►*
*╭──────────●●►*
*│⚜️ LIST MENU*
*│   ───────*
*│ 1   OWNER*
*│ 2   CONVERT*
*│ 3   AI*
*│ 4   SEARCH*
*│ 5   DOWNLOAD*
*│ 6   FUN*
*│ 7   MAIN*
*│ 8   GROUP*
*│ 9   OTHER*
*╰───────────●●►*

*🔢 Reply the Number you want to select*

💻 *GitHub:*  https://github.com/ASITHA-MD/ASITHA-MD

👩‍💻 *Channel:* https://whatsapp.com/channel/0029VaeyMWv3QxRu4hA6c33Z

> *POWERED by ASITHA-MD*
`
let ownermenu = `
*☠️ A S I T H A - M D ☠ - OWNER MENU ☠️*

   *HELLO* ${pushname}
*╭─「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ」*
*│◈ 𝚁𝙰𝙼 𝚄𝚂𝙰𝙶𝙴 -* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*│◈ 𝚁𝚄𝙽𝚃𝙸𝙼𝙴 -* ${runtime(process.uptime())}
*╰──────────●●►*
*╭──────────●●►*
*│⚜️ OWNER MENU*
*│   ───────*
${menu.owner}
*╰───────────●●►*


💻 *GitHub:*  https://github.com/ASITHA-MD/ASITHA-MD

> *POWERED by ASITHA-MD*
`
let convertmenu = `
*☠️ A S I T H A - M D ☠ - CONVERT MENU ☠️*

   *HELLO* ${pushname}
*╭─「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ」*
*│◈ 𝚁𝙰𝙼 𝚄𝚂𝙰𝙶𝙴 -* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*│◈ 𝚁𝚄𝙽𝚃𝙸𝙼𝙴 -* ${runtime(process.uptime())}
*╰──────────●●►*
*╭──────────●●►*
*│⚜️ CONVERT MENU*
*│   ───────*
${menu.convert}
*╰───────────●●►*


💻 *GitHub:*  https://github.com/ASITHA-MD/ASITHA-MD

> *POWERED by ASITHA-MD*
`
let downloadmenu = `
*☠️ A S I T H A - M D ☠ - DOWNLOAD MENU ☠️*

   *HELLO* ${pushname}
*╭─「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ」*
*│◈ 𝚁𝙰𝙼 𝚄𝚂𝙰𝙶𝙴 -* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*│◈ 𝚁𝚄𝙽𝚃𝙸𝙼𝙴 -* ${runtime(process.uptime())}
*╰──────────●●►*
*╭──────────●●►*
*│⚜️ DOWNLOAD MENU*
*│   ───────*
${menu.download}
*╰───────────●●►*


💻 *GitHub:*  https://github.com/ASITHA-MD/ASITHA-MD

> *POWERED by ASITHA-MD*
`
let mainmenu = `
*☠️ A S I T H A - M D ☠ - MAIN MENU ☠️*

   *HELLO* ${pushname}
*╭─「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ」*
*│◈ 𝚁𝙰𝙼 𝚄𝚂𝙰𝙶𝙴 -* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*│◈ 𝚁𝚄𝙽𝚃𝙸𝙼𝙴 -* ${runtime(process.uptime())}
*╰──────────●●►*
*╭──────────●●►*
*│⚜️ MAIN MENU*
*│   ───────*
${menu.main}
*╰───────────●●►*


💻 *GitHub:*  https://github.com/ASITHA-MD/ASITHA-MD

> *POWERED by ASITHA-MD*
`
let funmenu = `
*☠️ A S I T H A - M D ☠ - FUN MENU ☠️*

   *HELLO* ${pushname}
*╭─「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ」*
*│◈ 𝚁𝙰𝙼 𝚄𝚂𝙰𝙶𝙴 -* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*│◈ 𝚁𝚄𝙽𝚃𝙸𝙼𝙴 -* ${runtime(process.uptime())}
*╰──────────●●►*
*╭──────────●●►*
*│⚜️ FUN MENU*
*│   ───────*
${menu.fun}
*╰───────────●●►*


💻 *GitHub:*  https://github.com/ASITHA-MD/ASITHA-MD

> *POWERED by ASITHA-MD*
`
let groupmenu = `
*☠️ A S I T H A - M D ☠ - GROUP MENU ☠️*

   *HELLO* ${pushname}
*╭─「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ」*
*│◈ 𝚁𝙰𝙼 𝚄𝚂𝙰𝙶𝙴 -* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*│◈ 𝚁𝚄𝙽𝚃𝙸𝙼𝙴 -* ${runtime(process.uptime())}
*╰──────────●●►*
*╭──────────●●►*
*│⚜️ GROUP MENU*
*│   ───────*
${menu.group}
*╰───────────●●►*


💻 *GitHub:*  https://github.com/ASITHA-MD/ASITHA-MD

> *POWERED by ASITHA-MD*
`
let AImenu = `
*☠️ A S I T H A - M D ☠ - AI MENU ☠️*

   *HELLO* ${pushname}
*╭─「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ」*
*│◈ 𝚁𝙰𝙼 𝚄𝚂𝙰𝙶𝙴 -* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*│◈ 𝚁𝚄𝙽𝚃𝙸𝙼𝙴 -* ${runtime(process.uptime())}
*╰──────────●●►*
*╭──────────●●►*
*│⚜️ AI MENU*
*│   ───────*
${menu.ai}
*╰───────────●●►*


💻 *GitHub:*  https://github.com/ASITHA-MD/ASITHA-MD

> *POWERED by ASITHA-MD*

`
let searchmenu = `
*☠️ A S I T H A - M D ☠ - SEARCH MENU ☠️*

   *HELLO* ${pushname}
*╭─「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ」*
*│◈ 𝚁𝙰𝙼 𝚄𝚂𝙰𝙶𝙴 -* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*│◈ 𝚁𝚄𝙽𝚃𝙸𝙼𝙴 -* ${runtime(process.uptime())}
*╰──────────●●►*
*╭──────────●●►*
*│⚜️ SEARCH MENU*
*│   ───────*
${menu.search}
*╰───────────●●►*


💻 *GitHub:*  https://github.com/ASITHA-MD/ASITHA-MD

> *POWERED by ASITHA-MD*
`
let otherMenu = `
*☠️ A S I T H A - M D ☠ - OTHER MENU ☠️*

   *HELLO* ${pushname}
*╭─「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ」*
*│◈ 𝚁𝙰𝙼 𝚄𝚂𝙰𝙶𝙴 -* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*│◈ 𝚁𝚄𝙽𝚃𝙸𝙼𝙴 -* ${runtime(process.uptime())}
*╰──────────●●►*
*╭──────────●●►*
*│⚜️ CONVERT MENU*
*│   ───────*
${menu.other}
*╰───────────●●►*


💻 *GitHub:*  https://github.com/ASITHA-MD/ASITHA-MD

> *POWERED by ASITHA-MD*
`


// Send the initial message and store the message ID
const sentMsg = await conn.sendMessage(from, { text: menumsg ,
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
thumbnailUrl: "https://imgtr.ee/images/2024/09/10/b4114bd9c3e9b83985d354348e4938b0.jpeg" ,
renderLargerThumbnail: true,
showAdAttribution: true
}
}}, { quoted: mek})
const messageID = sentMsg.key.id; // Save the message ID for later reference


// Listen for the user's response
conn.ev.on('messages.upsert', async (messageUpdate) => {
    const mek = messageUpdate.messages[0];
    if (!mek.message) return;
    const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
    const from = mek.key.remoteJid;
    const sender = mek.key.participant || mek.key.remoteJid;

    // Check if the message is a reply to the previously sent message
    const isReplyToSentMsg = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo.stanzaId === messageID;

    if (isReplyToSentMsg) {
        // React to the user's reply (the "1" or "2" message)
        await conn.sendMessage(from, { react: { text: '🚀', key: mek.key } });

        if (messageType === '1') {
        
            await conn.sendMessage(from, { text: ownermenu ,
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
thumbnailUrl: "https://imgtr.ee/images/2024/09/10/b4114bd9c3e9b83985d354348e4938b0.jpeg" ,
renderLargerThumbnail: true,
showAdAttribution: true
}
}}, { quoted: mek})
        } else if (messageType === '2') {
        
            await conn.sendMessage(from, { text: convertmenu,
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
thumbnailUrl: "https://imgtr.ee/images/2024/09/10/b4114bd9c3e9b83985d354348e4938b0.jpeg" ,
renderLargerThumbnail: true,
showAdAttribution: true
}
}}, { quoted: mek})     
        } else if (messageType === '3') {
            await conn.sendMessage(from, { text: AImenu ,
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
thumbnailUrl: "https://imgtr.ee/images/2024/09/10/b4114bd9c3e9b83985d354348e4938b0.jpeg" ,
renderLargerThumbnail: true,
showAdAttribution: true
}
}}, { quoted: mek})
        } else if (messageType === '4') {
            await conn.sendMessage(from, { text: searchmenu ,
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
thumbnailUrl: "https://imgtr.ee/images/2024/09/10/b4114bd9c3e9b83985d354348e4938b0.jpeg" ,
renderLargerThumbnail: true,
showAdAttribution: true
}
}}, { quoted: mek})
        } else if (messageType === '5') {
            await conn.sendMessage(from, { text: downloadmenu,
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
thumbnailUrl: "https://imgtr.ee/images/2024/09/10/b4114bd9c3e9b83985d354348e4938b0.jpeg",
renderLargerThumbnail: true,
showAdAttribution: true
}
}}, { quoted: mek})
        } else if (messageType === '6') {
            await conn.sendMessage(from, { text: funmenu ,
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
thumbnailUrl: "https://imgtr.ee/images/2024/09/10/b4114bd9c3e9b83985d354348e4938b0.jpeg" ,
renderLargerThumbnail: true,
showAdAttribution: true
}
}}, { quoted: mek})
        } else if (messageType === '7') {
            await conn.sendMessage(from, { text: mainmenu ,
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
thumbnailUrl: "https://imgtr.ee/images/2024/09/10/b4114bd9c3e9b83985d354348e4938b0.jpeg" ,
renderLargerThumbnail: true,
showAdAttribution: true
}
}}, { quoted: mek})
        } else if (messageType === '8') {
         await conn.sendMessage(from, { text: groupmenu ,
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
thumbnailUrl: "https://imgtr.ee/images/2024/09/10/b4114bd9c3e9b83985d354348e4938b0.jpeg" ,
renderLargerThumbnail: true,
showAdAttribution: true
}
}}, { quoted: mek})
        } else if (messageType === '9') {
            await conn.sendMessage(from, { text: otherMenu ,
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
thumbnailUrl: "https://imgtr.ee/images/2024/09/10/b4114bd9c3e9b83985d354348e4938b0.jpeg" ,
renderLargerThumbnail: true,
showAdAttribution: true
}
}}, { quoted: mek})
        }

        // React to the successful completion of the task
        
    }
});

} catch (e) {
console.log(e);
reply(`${e}`);
}
});


