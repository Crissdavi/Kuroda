/* ytmp4 
by nov
 type plugins esm
*/
import fetch from 'node-fetch';
let handler = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {
    let [url, resolution] = text.split(' ');

    if (!url) {
        return conn.reply(m.chat, `Gunakan format: ${usedPrefix}${command} <url> [resolusi]`, m);
    }

    let res = await fetch(`https://ytdownloader.nvlgroup.my.id/info?url=${url}`);
    if (!res.ok) return conn.reply(m.chat, 'Gagal mengambil informasi video', m);

    let info = await res.json();
    let title = info.title;
    let duration = info.duration || 'Tidak diketahui';
    let usedResolution = resolution || '480';

    let downloadUrl = `https://ytdownloader.nvlgroup.my.id/download?url=${url}&resolution=${usedResolution}`;
    let videoRes = await fetch(downloadUrl);
    if (!videoRes.ok) return conn.reply(m.chat, 'Gagal mengunduh video', m);

    let videoBuffer = await videoRes.buffer();
    let videoSize = videoBuffer.length / (1024 * 1024);

    let message = `
[YTMP4 DOWNLOADER]
🎥 *Judul:* ${title}
🔗 *Link:* [Watch Here](${url})
⏱️ *Durasi:* ${duration} menit
📦 *Besar File:* ${videoSize.toFixed(2)} MB
🎨 *Resolusi yang Digunakan:*${usedResolution}
`;

    await conn.reply(m.chat, message, m);

    if (videoSize > 100) {
        await conn.sendMessage(m.chat, {
            document: videoBuffer,
            mimetype: 'video/mp4',
            fileName: `${title}.mp4`
        });
    } else {
        await conn.sendMessage(m.chat, {
            video: videoBuffer,
            caption: title,
            mimetype: 'video/mp4'
        });
    }
}

handler.help = ['ytmp4']
handler.command = ['ytmp4|ytv|ytvideo']
handler.tags = ['main']

export default handler