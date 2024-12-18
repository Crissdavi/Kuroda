import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
//wmmm https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
let handler = async (m, { conn, text, usedPrefix, command }) => {
text = m.quoted && m.quoted.text ? m.quoted.text : text
  if (!text) {
    return conn.reply(m.chat, `Gunakan format:\n${usedPrefix + command} <query>\n\nContoh: ${usedPrefix + command} cara membuat kue\n\natau kalian reply teks!`, m);
  }
//wm https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
  //hapus?=mandul https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
  const result = await felo.ask(text);
//wwmmm https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
  if (!result) {
    return conn.reply(m.chat, 'Maaf, terjadi kesalahan saat memproses permintaan Anda.', m);
  }
//hapus?=sdm rendah https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
  const { answer, source } = result;
  if (!answer) {
    return conn.reply(m.chat, 'Maaf, tidak ditemukan jawaban untuk pertanyaan Anda.', m);
  }
//wwwmmm https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
  //https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
  const response = `${answer}`;
//hapus wm=sdm rendah https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
  conn.reply(m.chat, response, m);
};
//hapus wm=mandul https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
handler.help = ["feloai"];
handler.tags = ["ai"];
handler.command = ["feloai"];
//wwmmm https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
export default handler;

//SCRAPE BY DAFFA https://whatsapp.com/channel/0029VaiVeWA8vd1HMUcb6k2S/309
const felo = {
  ask: async function (query) {
    const headers = {
      "Accept": "*/*",
      "User-Agent": "Postify/1.0.0",
      "Content-Encoding": "gzip, deflate, br, zstd",
      "Content-Type": "application/json",
    };

    const payload = {
      query,
      search_uuid: uuidv4().replace(/-/g, ''),
      search_options: { langcode: "id-MM" },
      search_video: true,
    };

    const request = (badi) => {
      const result = { answer: '', source: [] };
      badi.split('\n').forEach(line => {
        if (line.startsWith('data:')) {
          try {
            const data = JSON.parse(line.slice(5).trim());
            if (data.data) {
              if (data.data.text) {
                result.answer = data.data.text.replace(/\[\d+\]/g, '');
              }
              if (data.data.sources) {
                result.source = data.data.sources.map(src => ({
                  url: src.url || '',
                  title: src.title || ''
                }));
              }
            }
          } catch (e) {
            console.error(e);
          }
        }
      });
      return result;
    };

    try {
      const response = await axios.post("https://api.felo.ai/search/threads", payload, {
        headers,
        timeout: 30000,
        responseType: 'text',
      });

      return request(response.data);
    } catch (error) {
      console.error(error);
      return null;
    }
  }
};
/*
*<>FELOAI, REALTIME<>*
SOURCE: https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
DON'T DELETE THIS WM!
HAPUS WM MANDUL 7 TURUNAN 
HAPUS WM=SDM RENDAH 
*BAGI YANG RECODE DAN YANG MENYESUAIKAN LAGI NI CODE, MOHON UNTUK JANGAN DIHAPUS WM PERTAMA, ATAU BERI CREDIT LINK CH YANG SHARE CODE INI!*
"aku janji tidak akan hapus wm ini"
RABU, 18 DESEMBER 2024 08:07
*/