
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `*\`Ingresa un link de youtube\`*`, m, fake)
  await m.react('🕓')

  try {
    if (command === 'ytmp3' || command === 'yta' || command === 'fgmp3') {
      let api = await (await fetch(`https://api.siputzx.my.id/api/d/ytmp3?url=${text}`)).json()
      let dl_url = api.data.dl
      let title = api.data.title

      await conn.sendMessage(m.chat, { audio: { url: dl_url }, fileName: `${title}.mp3`, mimetype: 'audio/mp4' }, { quoted: m })
      await m.react('✅')
    } else if (command === 'ytmp4' || command === 'ytv' || command === 'fgmp4') {
      let api = await (await fetch(`https://api.siputzx.my.id/api/d/ytmp4?url=${text}`)).json()
      let dl_url = api.data.dl

      await conn.sendMessage(m.chat, { video: { url: dl_url }, caption: null }, { quoted: m })
      await m.react('✅')
    }
  } catch (error) {
    console.error(error)
    await m.react('❌')
  }
}

handler.help = ['ytmp3 *<url>*', 'ytmp4 *<url>*'];
handler.tags = ['downloader'];
handler.command = ['ytmp3', 'yta', 'fgmp3', 'ytmp4', 'ytv', 'fgmp4']

export default handler