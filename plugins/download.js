const { fetchJson } = require('../lib/functions')
const config = require('../config')
const { igdl } = require('ruhend-scraper')
const fg = require('api-dylux')
const yts = require('yt-search')
const { cmd, commands } = require('../command')
let { img2url } = require('@blackamda/telegram-image-url');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const cheerio = require('cheerio')
const ffmpeg = require('fluent-ffmpeg')

ffmpeg.setFfmpegPath(ffmpegPath);
async function videoToWebp (media) {
const tmpFileOut = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`)
    const tmpFileIn = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.mp4`)

    fs.writeFileSync(tmpFileIn, media)

    await new Promise((resolve, reject) => {
        ffmpeg(tmpFileIn)
            .on("error", reject)
            .on("end", () => resolve(true))
            .addOutputOptions([
                "-vcodec",
                "libwebp",
                "-vf",
                "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse",
                "-loop",
                "0",
                "-ss",
                "00:00:00",
                "-t",
                "00:00:05",
                "-preset",
                "default",
                "-an",
                "-vsync",
                "0"
            ])
            .toFormat("webp")
            .save(tmpFileOut)
    })

    const buff = fs.readFileSync(tmpFileOut)
    fs.unlinkSync(tmpFileOut)
    fs.unlinkSync(tmpFileIn)
    return buff
}
// FETCH API URL
let baseUrl;
(async () => {
    let baseUrlGet = await fetchJson(`https://raw.githubusercontent.com/prabathLK/PUBLIC-URL-HOST-DB/main/public/url.json`)
    baseUrl = baseUrlGet.api
})();


const yourName = "*POWERED by ASITHA-MD*"; // YOURBOTNAME 💚 කියන තැනට ඔයාගේ බොට්ගේ නම හරි ඔයාගෙ නම හරි දාන්න.



//fb downloader
cmd({
    pattern: "fb",
    alias: ["facebook"],
    desc: "download fb videos",
    react: "🎥",
    category: "download",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q && !q.startsWith("https://")) return reply("*give me fb url ❌*")
        let data = await fetchJson(`${baseUrl}/api/fdown?url=${q}`)

let desc = `
💢 *ASITHA-MD FB DOWNLOADER* 💢


🔢 *Please reply the number you want to select*

*[1] facebook Video*

1 | 🔋 HD QUALITY
2 | 🪫 SD QUALITY

*URL :* ${q}

> *POWERED by ASITHA-MD*
`

// Send the initial message and store the message ID
const sentMsg = await conn.sendMessage(from, { text : desc }, { quoted: mek });
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
        await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });

        let data = await fetchJson(`${baseUrl}/api/fdown?url=${q}`)

        // React to the upload (sending the file)
        await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });

        if (messageType === '1') {
            // Handle option 1 (HD File)
          await conn.sendMessage(from, { video: { url: data.data.hd }, mimetype: "video/mp4", caption: `> ${yourName}` }, { quoted: mek })
         } else if (messageType === '2') {
            // Handle option 2 (SD File)
           await conn.sendMessage(from, { video: { url: data.data.sd }, mimetype: "video/mp4", caption: `> ${yourName}` }, { quoted: mek })  
           
        }


        // React to the successful completion of the task
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

        console.log("Response sent successfully");
    }
});

} catch (e) {
console.log(e);
reply(`${e}`);
}
});

//tiktok downloader
cmd({
    pattern: "tiktok",
    alias: ["tt"],
    react: "🎥",
    desc: "download tt videos",
    category: "download",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q && !q.startsWith("https://")) return reply("*give me tiktok url ❌*")
        //fetch data from api  
        let data = await fetchJson(`${baseUrl}/api/tiktokdl?url=${q}`)
     let desc = `
     🎟️ *ASITHA-MD TIKTOK DOWNLOADER* 🎟️

🔢 *Please reply with the number you want to select:*

*1.* Tiktok Video

   1.1 | 📼 No-Watermark
   1.2 | 🎟️ With-Watermark

*2.* Tiktok Audio

   2.1 | 🎶 Audio file
   2.2 | Document File 📂
   
*URL:* ${q}

> *POWERED by ASITHA-MD*    
     `

const sentMsg = await conn.sendMessage(from, { text: desc }, { quoted: mek });
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
        await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });
        let data = await fetchJson(`${baseUrl}/api/tiktokdl?url=${q}`)

        // React to the upload (sending the file)
        await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });

        if (messageType === '1.1') {
            // Handle option 1 (no wm File)
          await conn.sendMessage(from, { video: { url: data.data.no_wm }, mimetype: "video/mp4", caption: `> ${yourName}` }, { quoted: mek })
       
            }
         else if (messageType === '1.2') {
            // Handle option 2 (wm File)
            await conn.sendMessage(from, { video: { url: data.data.wm }, mimetype: "video/mp4", caption: `> ${yourName}` }, { quoted: mek })  
          }
           
          else if (messageType === '2.1') {
            //Handle option 3 (audio File)  
          await conn.sendMessage(from, { audio: { url: data.data.audio }, mimetype: "audio/mpeg" }, { quoted: mek })  
    
          }

        else if (messageType === '2.2') {
        await conn.sendMessage(from, { document: { url: data.data.audio }, mimetype: "audio/mpeg", fileName: "ASITHA-MD☠️" + ".mp3", caption: "> *POWERED by ASITHA-MD*" }, { quoted: mek });

        }
        // React to the successful completion of the task
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

        console.log("Response sent successfully");
    }
});

} catch (e) {
console.log(e);
reply(`${e}`);
}
});


//twitter dl (x)
cmd({
    pattern: "twitter",
    alias: ["twdl"],
    react: "🎥",
    desc: "download tw videos",
    category: "download",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q && !q.startsWith("https://")) return reply("*give me twitter url ❌*")
        m.react('⬇️')
        //fetch data from api  
        let data = await fetchJson(`${baseUrl}/api/twitterdl?url=${q}`)
        reply("*Downloading...*")
        //send video (hd,sd)
        m.react('⬆️')
        await conn.sendMessage(from, { video: { url: data.data.data.HD }, mimetype: "video/mp4", caption: `> ${yourName}` }, { quoted: mek })
        m.react('✅')
        await conn.sendMessage(from, { video: { url: data.data.data.SD }, mimetype: "video/mp4", caption: `> ${yourName}` }, { quoted: mek })  
        m.react('✅')
        //send audio    
        await conn.sendMessage(from, { audio: { url: data.data.data.audio }, mimetype: "audio/mpeg" }, { quoted: mek })  
        m.react('✅')
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})

//gdrive(google drive) dl
cmd({
    pattern: "gdrive",
    alias: ["googledrive"],
    react: "📀",
    desc: "download gdrive files",
    category: "download",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q && !q.startsWith("https://")) return reply("*give me gdrive url ❌*")
        m.react('⬇️')
        //fetch data from api  
        let data = await fetchJson(`${baseUrl}/api/gdrivedl?url=${q}`)
        reply("*Downloading...⏳*")
        m.react('⬆️')
        await conn.sendMessage(from, { document: { url: data.data.download }, fileName: data.data.fileName, mimetype: data.data.mimeType, caption: `${data.data.fileName}\n\n> ${yourName}` }, { quoted: mek })  
        m.react('✅')
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})

//mediafire dl
cmd({
    pattern: "mediafire",
    alias: ["mfire"],
    react: "📚",
    desc: "download mfire files",
    category: "download",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q && !q.startsWith("https://")) return reply("*give me mediafire url ❌*")
        m.react('⬇️')
        //fetch data from api  
        let data = await fetchJson(`${baseUrl}/api/mediafiredl?url=${q}`)
        reply("*Downloading...*")
        m.react('⬆️')
        await conn.sendMessage(from, { document: { url: data.data.link_1 }, fileName: data.data.name, mimetype: data.data.file_type, caption: `${data.data.name}\n\n${yourName}` }, { quoted: mek })                                                                                                                 
        m.react('✅')
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})
//instgarm download 


cmd({

    pattern: "ig",
    desc: "To get the bot informations.",
    react: "🎥",
    category: "download",
    filename: __filename

},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {

try{
    
if (!q) return m.reply(`Please Give Me a vaild Link...`);
m.react('⬇️')

         let res = await igdl(q);
        
         let data = await res.data;
         for (let i = 0; i < 20; i++) {
            let media = data[i];
            let downloadurl = media.url
             m.react('⬆️')
            await conn.sendMessage(from,{video: {url:downloadurl},mimetype:"video/mp4",caption: `> ${yourName}`},{quoted:mek})
             m.react('✅')
         }

}catch(e){
console.log(e)
reply(`${e}`)
}
})
// song download 
cmd({
    pattern: "song",
    desc: "downlod song",
    react: "🎵",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if(!q) return reply("*❌Please give me url or titel*")
const search = await yts(q)
const deta = search.videos[0];
const url = deta.url 

let desc= `
*🎶𝗔𝗦𝗜𝗧𝗛𝗔-𝗠𝗗 𝗔𝗨𝗗𝗜𝗢-𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥🎶*  
*|__________________________*
*|-ℹ️ 𝚃𝚒𝚝𝚕𝚎 :* ${deta.title}
*|*
*|-🗒️ Description :* ${deta.description}
*|*
*|-🕘 𝚃𝚒𝚖𝚎 :* ${deta.timestamp}
*|*
*|-📌 𝙰𝚐𝚘 :* ${deta.ago}
*|*
*|-📉 𝚅𝚒𝚎𝚠𝚜 :* ${deta.views}
*|__________________________*


🔽 *To download send:*

1. *Audio File* 🎶
2. *Document File* 📂

> *POWERED by ASITHA-MD*
`


// Send the initial message and store the message ID
const sentMsg = await conn.sendMessage(from, { image: { url: deta.thumbnail }, caption: desc }, { quoted: mek });
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
        await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });

        const down = await fg.yta(url);
        const downloadUrl = down.dl_url;

        // React to the upload (sending the file)
        await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });

        if (messageType === '1') {
            // Handle option 1 (Audio File)
            await conn.sendMessage(from, { audio: { url: downloadUrl }, mimetype: "audio/mpeg" }, { quoted: mek });
        } else if (messageType === '2') {
            // Handle option 2 (Document File)
            await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "audio/mpeg", fileName: deta.title + ".mp3", caption: "> *POWERED by ASITHA-MD*" }, { quoted: mek });
        }
        // React to the successful completion of the task
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

        console.log("Response sent successfully");
    }
});

} catch (e) {
console.log(e);
reply(`${e}`);
}
});
//========video dl=======

cmd({
    pattern: "video",
    desc: "downlod video",
    react: "🎥",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if(!q) return reply("*❌Please give me url or title*")
const search = await yts(q)
const deta = search.videos[0];
const url = deta.url 

let desc= `
*📽️ASITHA-MD VIDEO-DOWNLOADER📽️*
*|__________________________*
*|-ℹ️ 𝚃𝚒𝚝𝚕𝚎* : ${deta.title}
*|*
*|-🗒️ Description :* ${deta.description}
*|*
*|-🕘 𝚃𝚒𝚖𝚎 :* ${deta.timestamp}
*|*
*|-📌 𝙰𝚐𝚘 :* ${deta.ago}
*|*
*|-📉 𝚅𝚒𝚎𝚠𝚜 :* ${deta.views}
*|__________________________*

🔽 *To download send:*

1. *Video File* 🎶
2. *Document File* 📂

> *POWERED by ASITHA-MD*
`

// Send the initial message and store the message ID
const sentMsg = await conn.sendMessage(from, { image: { url: deta.thumbnail }, caption: desc }, { quoted: mek });
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
        await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });

        const down = await fg.yta(url);
        const downloadUrl = down.dl_url;

        // React to the upload (sending the file)
        await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });

        if (messageType === '1') {
            // Handle option 1 (Audio File)
            await conn.sendMessage(from,{video:{url:downloadUrl},mimetype:"video/mp4",caption :"> *POWERED by ASITHA-MD*"},{quoted:mek})
       } else if (messageType === '2') {
            // Handle option 2 (Document File)
            await conn.sendMessage(from,{document:{url:downloadUrl},mimetype:"video/mp4",fileName:deta.title + ".mp4",caption :"> *POWERED by ASITHA-MD*"},{quoted:mek})
       }
        // React to the successful completion of the task
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

        console.log("Response sent successfully");
    }
});

} catch (e) {
console.log(e);
reply(`${e}`);
}
});

//ytdl 

// Function to extract the video ID from youtu.be or YouTube links
function extractYouTubeId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|playlist\?list=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Function to convert any YouTube URL to a full YouTube watch URL
function convertYouTubeLink(q) {
    const videoId = extractYouTubeId(q);
    if (videoId) {
        return `https://www.youtube.com/watch?v=${videoId}`;
    }
    return q;
}

// .ytmp3 command
cmd({
    pattern: "ytmp3",
    desc: "Download YouTube videos as MP3.",
    react: "🎵",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please provide a YouTube URL or title.");
        q = convertYouTubeLink(q);
        const search = await yts(q);
        const deta = search.videos[0];
        const url = deta.url;

        let desc= `
*🎶𝗔𝗦𝗜𝗧𝗛𝗔-𝗠𝗗 𝗔𝗨𝗗𝗜𝗢-𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥🎶*  
*|__________________________*
*|-ℹ️ 𝚃𝚒𝚝𝚕𝚎 :* ${deta.title}
*|*
*|-🗒️ Description :* ${deta.description}
*|*
*|-🕘 𝚃𝚒𝚖𝚎 :* ${deta.timestamp}
*|*
*|-📌 𝙰𝚐𝚘 :* ${deta.ago}
*|*
*|-📉 𝚅𝚒𝚎𝚠𝚜 :* ${deta.views}
*|__________________________*


🔽 *To download send:*

1. *Audio File* 🎶
2. *Document File* 📂

> *POWERED by ASITHA-MD*
`;


// Send the initial message and store the message ID
const sentMsg = await conn.sendMessage(from, { image: { url: deta.thumbnail }, caption: desc }, { quoted: mek });
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
        await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });

        const down = await fg.yta(url);
        const downloadUrl = down.dl_url;

        // React to the upload (sending the file)
        await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });

        if (messageType === '1') {
            // Handle option 1 (Audio File)
            await conn.sendMessage(from, { audio: { url: downloadUrl }, mimetype: "audio/mpeg" }, { quoted: mek });
        } else if (messageType === '2') {
            // Handle option 2 (Document File)
            await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "audio/mpeg", fileName: deta.title + ".mp3", caption: "> *POWERED by ASITHA-MD*" }, { quoted: mek });
        }
        // React to the successful completion of the task
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

        console.log("Response sent successfully");
    }
});

} catch (e) {
console.log(e);
reply(`${e}`);
}
});

// .ytmp4 command
cmd({
    pattern: "ytmp4",
    desc: "Download YouTube videos as MP4.",
    react: "🎥",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please provide a YouTube URL or title.");
        q = convertYouTubeLink(q);
        const search = await yts(q);
        const deta = search.videos[0];
        const url = deta.url;

        let desc= `
*📽️ASITHA-MD VIDEO-DOWNLOADER📽️*
*|__________________________*
*|-ℹ️ 𝚃𝚒𝚝𝚕𝚎 :* ${deta.title}
*|*
*|-🗒️ Description :* ${deta.description}
*|*
*|-🕘 𝚃𝚒𝚖𝚎 :* ${deta.timestamp}
*|*
*|-📌 𝙰𝚐𝚘 :* ${deta.ago}
*|*
*|-📉 𝚅𝚒𝚎𝚠𝚜 :* ${deta.views}
*|__________________________*


🔽 *To download send:*

1. *Video File* 🎶
2. *Document File* 📂

> *POWERED by ASITHA-MD*
`

// Send the initial message and store the message ID
const sentMsg = await conn.sendMessage(from, { image: { url: deta.thumbnail }, caption: desc }, { quoted: mek });
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
        await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });

        const down = await fg.yta(url);
        const downloadUrl = down.dl_url;

        // React to the upload (sending the file)
        await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });

        if (messageType === '1') {
            // Handle option 1 (Audio File)
            await conn.sendMessage(from, { video: { url: downloadUrl }, mimetype: "video/mp4" }, { quoted: mek });
        } else if (messageType === '2') {
            // Handle option 2 (Document File)
            await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "video/mp4", fileName: deta.title + ".mp4", caption: "> *POWERED by ASITHA-MD*" }, { quoted: mek });
        }

        // React to the successful completion of the task
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

        console.log("Response sent successfully");
    }
});

} catch (e) {
console.log(e);
reply(`${e}`);
}
});
async function xdl(URL) {
  return new Promise((resolve, reject) => {
    fetch(`${URL}`, {method: 'get'}).then((res) => res.text()).then((res) => {
      const $ = cheerio.load(res, {xmlMode: false});
      const title = $('meta[property="og:title"]').attr('content');
      const duration = $('meta[property="og:duration"]').attr('content');
      const image = $('meta[property="og:image"]').attr('content');
      const videoType = $('meta[property="og:video:type"]').attr('content');
      const videoWidth = $('meta[property="og:video:width"]').attr('content');
      const videoHeight = $('meta[property="og:video:height"]').attr('content');
      const info = $('span.metadata').text();
      const videoScript = $('#video-player-bg > script:nth-child(6)').html();
      const files = {
        low: (videoScript.match('html5player.setVideoUrlLow\\(\'(.*?)\'\\);') || [])[1],
        high: videoScript.match('html5player.setVideoUrlHigh\\(\'(.*?)\'\\);' || [])[1],
        HLS: videoScript.match('html5player.setVideoHLS\\(\'(.*?)\'\\);' || [])[1],
        thumb: videoScript.match('html5player.setThumbUrl\\(\'(.*?)\'\\);' || [])[1],
        thumb69: videoScript.match('html5player.setThumbUrl169\\(\'(.*?)\'\\);' || [])[1],
        thumbSlide: videoScript.match('html5player.setThumbSlide\\(\'(.*?)\'\\);' || [])[1],
        thumbSlideBig: videoScript.match('html5player.setThumbSlideBig\\(\'(.*?)\'\\);' || [])[1]};
      resolve({status: true, result: {title, URL, duration, image, videoType, videoWidth, videoHeight, info, files}});
    }).catch((err) => reject({status: false, result: err}));
  });
}

cmd({
    pattern: "xnxxdown",
    alias: ["dlxnxx","xnxxdl"],
    react: '🫣',
    desc: "Download xnxx videos",
    category: "download",
    use: '.xnxx <xnxx link>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
 //if (!isMe) return await reply('🚩 You are not a premium user\nbuy via message to owner!!')
 if (!q) return reply('*Please give me url !!*')
  let res = await xdl(q)
  let title = res.result.title
  await conn.sendMessage(from, { video: { url: res.result.files.high }, caption: `${title}\n\n> *POWERED by ASITHA-MD*`}, { quoted: mek })
} catch (e) {
reply('*Error !!*')
console.log(e)
}
})

