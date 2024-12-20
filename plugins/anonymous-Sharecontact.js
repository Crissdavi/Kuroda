const { MessageType, Presence } = (await import('@adiwajshing/baileys')).default

async function handler(m, { command, conn, text }) {
	this.anonymous = this.anonymous ? this.anonymous : {}
	let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
	let room = Object.values(this.anonymous).find(room => room.check(who))
	if (!room) throw 'No estas en un chat anonimo '
	let other = room.other(who)
  var name
  if (text) name = text
  else name = conn.getName(m.sender)
	var number = who.split('@')[0]
	let tks = `➔ Nomor: ${m.sender.split`@`[0]}
➔ Nama: ${name}`
    this.reply(m.chat, 'enviando contacto...')
	if (other) this.reply(other, `Tu amig@ te ha compartido un comtacto `)
	if (other) this.sendFile(other, await conn.profilePictureUrl(m.sender, 'image').catch(_ => './src/avatar_contact.png'), '', `${htki} ᴀɴᴏɴʏᴍᴏᴜs ᴄʜᴀᴛs ${htka}\n` + tks, 0,  { mentionedJid: [m.sender]})
}

handler.help = ['sendcontact']
handler.tags = 'anonymous'
handler.command = /^(sendcontact|enviarcontacto|compartircontacto)$/i
handler.private = true

export default handler
