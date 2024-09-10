const { Buffer } = require('buffer');
const axios = require('axios');
const { cmd, commands } = require('../command')
const fs = require('fs');
const util = require('util');
const streamPipeline = util.promisify(require('stream').pipeline);
const config = require('../config'); // Assuming you have an API key stored in config
const Esana = require('@sl-code-lords/esana-news');
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

var api = new Esana()
cmd({
    pattern: "wiki",
    desc: "Search Wikipedia and get a summary.",
    category: "search",
    react: "📚",
    filename: __filename
},
async(conn, mek, m, {from, args, reply}) => {
    try {
        if (args.length < 1) return reply('Please provide a search term.');
        const query = args.join(' ');
        const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;

        const response = await axios.get(url);
        const { extract, title } = response.data;

        const message = `*${title}*\n\n${extract}\n\n> *POWERED by ASITHA-MD*`;
        return await conn.sendMessage(from, { text: message }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply('An error occurred while searching Wikipedia.');
    }
})


//esana
cmd({
    pattern: "esananews",
    react: '🎙️',
    desc: "To see esana news",
    category: "search",
    use: '.sirasa',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    const latst = await api.latest_id();
            const nws = latst.results.news_id
            let nn = q || nws
            const ress = await api.news(nn);
            const res = ress.results;

            const txt2 = await conn.sendMessage(from, {image: 
	    {url: res.COVER},caption: `\n*┃◉* *⇨ ᴛɪᴛᴇʟ :*
 ${res.TITLE}\n\n*┃◉* *⇨ ᴅᴀᴛᴇ :*
 ${res.PUBLISHED}\n\n*┃◉* *⇨ ᴜʀʟ :*
 ${res.URL}\n\n*┃◉* *⇨ Description :*
 ${res.DESCRIPTION}\n\n> *POWERED by ASITHA-MD*\n\n`},
			{ quoted: mek });
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply()
l(e)
}
})       



cmd({
    pattern: "news",
    desc: "Get the latest news headlines.",
    category: "search",
    react: "📰",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const apiKey="0f2c43ab11324578a7b1709651736382";
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
        const articles = response.data.articles;

        if (!articles.length) return reply("No news articles found.");

        // Send each article as a separate message with image and title
        for (let i = 0; i < Math.min(articles.length, 5); i++) {
            const article = articles[i];
            let message = `
📰 *${article.title}*
⚠️ _${article.description}_
🔗 _${article.url}_

> *POWERED by ASITHA-MD*
            `;

            console.log('Article URL:', article.urlToImage); // Log image URL for debugging

            if (article.urlToImage) {
                // Send image with caption
                await conn.sendMessage(from, { image: { url: article.urlToImage }, caption: message });
            } else {
                // Send text message if no image is available
                await conn.sendMessage(from, { text: message });
            }
        };
    } catch (e) {
        console.error("Error fetching news:", e);
        reply("Could not fetch news. Please try again later.");
    }
});

async function xnxxs(query) {
    return new Promise((resolve, reject) => {
      const baseurl = 'https://www.xnxx.com';
      fetch(`${baseurl}/search/${query}/${Math.floor(Math.random() * 3) + 1}`, {method: 'get'}).then((res) => res.text()).then((res) => {
        const $ = cheerio.load(res, {xmlMode: false});
        const title = [];
        const url = [];
        const desc = [];
        const results = [];
        $('div.mozaique').each(function(a, b) {
          $(b).find('div.thumb').each(function(c, d) {
            url.push(baseurl + $(d).find('a').attr('href').replace('/THUMBNUM/', '/'));
          });
        });
        $('div.mozaique').each(function(a, b) {
          $(b).find('div.thumb-under').each(function(c, d) {
            desc.push($(d).find('p.metadata').text());
            $(d).find('a').each(function(e, f) {
              title.push($(f).attr('title'));
            });
          });
        });
        for (let i = 0; i < title.length; i++) {
          results.push({title: title[i], info: desc[i], link: url[i]});
        }
        resolve({status: true, result: results});
      }).catch((err) => reject({status: false, result: err}));
    });
  }
  
  cmd({
      pattern: "xnxxs",
      alias: ["xnxxsearch"],
      use: '.yts <song name>',
      react: "🫣",
      desc: "Search and get details from xnxx.",
      category: "search",
      filename: __filename
  
  },
  
  async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
  try{
  //if (!isMe) return await reply('🚩 You are not a premium user\nbuy via message to owner!!')
  if (!q) return reply('🚩 *Please give me words to search*')
  let res = await xnxxs(q)
  let x = res.result.map((v) => `乂 S-XNXX 乂\n◦ *Title:* ${v.title}\n◦ *Info:* ${v.info}\n◦ *Link:* ${v.link}`).join`\n\n°°°°°°°°°°°°°°°°°°°°°°°°°°°°°\n\n`
  reply(x)
  } catch (e) {
      console.log(e)
    await conn.sendMessage(from, { text: '🚩 *Error !!*' }, { quoted: mek } )
  }
  })
const GOOGLE_API_KEY = 'AIzaSyDebFT-uY_f82_An6bnE9WvVcgVbzwDKgU'; // Replace with your Google API key
const GOOGLE_CX = '45b94c5cef39940d1'; // Replace with your Google Custom Search Engine ID

cmd({
    pattern: "img",
    desc: "Search and send images from Google.",
    react: "🖼️",
    category: "search",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please provide a search query for the image.");

        // Fetch image URLs from Google Custom Search API
        const searchQuery = encodeURIComponent(q);
        const url = `https://www.googleapis.com/customsearch/v1?q=${searchQuery}&cx=${GOOGLE_CX}&key=${GOOGLE_API_KEY}&searchType=image&num=5`;
        
        const response = await axios.get(url);
        const data = response.data;

        if (!data.items || data.items.length === 0) {
            return reply("No images found for your query.");
        }

        // Send images
        for (let i = 0; i < data.items.length; i++) {
            const imageUrl = data.items[i].link;

            // Download the image
            const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
            const buffer = Buffer.from(imageResponse.data, 'binary');

            // Send the image with a footer
            await conn.sendMessage(from, {
                image: buffer,
                caption: `
*Image ${i + 1} from your search!*
*ASITHA MD IMG DOWNLOADER*

> *POWERED by ASITHA-MD* 📸
`
}, { quoted: mek });
}

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message}`);
    }
});

cmd({
    pattern: "movie",
    desc: "Fetch detailed information about a movie.",
    category: "other",
    react: "🎬",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const movieName = args.join(' ');
        if (!movieName) {
            return reply("📽️ Please provide the name of the movie.");
        }

        const apiUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=76cb7f39`;
        const response = await axios.get(apiUrl);

        const data = response.data;
        if (data.Response === "False") {
            return reply("🚫 Movie not found.");
        }

        const movieInfo = `
🎬 *Movie Information* 🎬

🎥 *Title:* ${data.Title}

📅 *Year:* ${data.Year}

🌟 *Rated:* ${data.Rated}

📆 *Released:* ${data.Released}

⏳ *Runtime:* ${data.Runtime}

🎭 *Genre:* ${data.Genre}

🎬 *Director:* ${data.Director}

✍️ *Writer:* ${data.Writer}

🎭 *Actors:* ${data.Actors}

📝 *Plot:* ${data.Plot}

🌍 *Language:* ${data.Language}

🇺🇸 *Country:* ${data.Country}

🏆 *Awards:* ${data.Awards}

⭐ *IMDB Rating:* ${data.imdbRating}

🗳️ *IMDB Votes:* ${data.imdbVotes}
`;

        // Define the image URL
        const imageUrl = data.Poster && data.Poster !== 'N/A' ? data.Poster : config.ALIVE_IMG;

        // Send the movie information along with the poster image
        await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: `${movieInfo}\n> *POWERED by ASITHA-MD*`
        }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e.message}`);
    }
});
cmd({
    pattern: "yts",
    alias: ["ytsearch"],
    use: '.yts lelena',
    react: "🔎",
    desc: "Search and get details from youtube.",
    category: "search",
    filename: __filename

},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return reply('*Please give me words to search*')
try {
let yts = require("yt-search")
var arama = await yts(q);
} catch(e) {
    l(e)
return await conn.sendMessage(from , { text: '*Error !!*' }, { quoted: mek } )
}
var mesaj = '';
arama.all.map((video) => {
mesaj += ' *🖲️' + video.title + '*\n🔗 ' + video.url + '\n\n'
});
await conn.sendMessage(from, { text: mesaj ,
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
thumbnailUrl: "https://i.ibb.co/g9RqK6G/Picsart-24-09-09-17-05-15-622.jpg" ,
renderLargerThumbnail: true,
showAdAttribution: true
}
}}, { quoted: mek})
} catch (e) {
    l(e)
  reply('*Error !!*')
}
});
