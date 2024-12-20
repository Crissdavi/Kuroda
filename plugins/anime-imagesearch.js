// Don't delete this credit!!!
// Script by ShirokamiRyzen
// updated by Xnuvers007

import fetch from 'node-fetch';
import { uploadToPomf2 } from '../lib/uploadImage.js';

let handler = async (m, { conn, usedPrefix, command }) => {
    try {
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || '';
        if (!mime) throw `responde a la imagen con ${usedPrefix + command}`;

        m.reply('Espere un momento por favor ...');

        let media = await q.download();
        let url = await uploadToPomf2(media);
        let hasil = await fetch(`https://api.trace.moe/search?cutBorders&url=${encodeURIComponent(url)}`);

        let response = await hasil.json();

        if (response && response.result && response.result.length > 0) {
            for (let result of response.result) {
                let filename = result.filename;
                let episode = result.episode ? result.episode : 'N/A';
                let similarity = Math.round(result.similarity * 100);
                let videoURL = result.video;

                let caption = `Name: ${filename}\nEpisode: ${episode}\nSimilarity: ${similarity}%`;

                await conn.sendFile(m.chat, videoURL, filename, caption, m);
            }
        } else {
            m.reply('No hay resultados');
        }
    } catch (error) {
        console.error(error);
        if (error.includes(`responde a la imagen con ${usedPrefix + command}`)) {
            m.reply(error);
        } else {
            m.reply('Error interno del servidor');
        }
    }
};

handler.help = ['animesearch'];
handler.tags = ['anime'];
handler.command = /^(animesearch|buscaranime)$/i;

handler.limit = 2;

export default handler;
