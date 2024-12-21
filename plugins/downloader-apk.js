import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `Utilice el ejemplo ${usedPrefix}${command} nombre del APK o id APK\n*${usedPrefix}${command} whatsapp*\n*${usedPrefix}${command} com.whatsapp*\n`;

  try {
    const apkId = encodeURIComponent(args.join(' '));
    const response = await fetch(`https://vihangayt.me/download/apk?id=${apkId}`);
    const data = await response.json();

    if (data.status) {
      const apkData = data.data;
      const message = `
*information APK*
Name: ${apkData.name}
Last Update: ${apkData.lastup}
Package: ${apkData.package}
Size: ${apkData.size}
Icon: ${apkData.icon}
Download Link: ${apkData.dllink}
      `;
      await conn.sendFile(m.chat, apkData.dllink, `${apkData.name}.apk`, message, m);
    } else {
      conn.reply(m.chat, 'No se puede encontrar información del APK', m);
    }
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, 'Ocurrio un error al procesar su solicitud ', m);
  }
};

handler.help = ['apkdl']
handler.tags = ['downloader']
handler.command = /^(apkdl|downloadapk|apkdownload|apk)$/i

export default handler;
