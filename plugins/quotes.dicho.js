import { Quotes } from 'dhn-api'
var handler = async(m, { conn, text }) => {
var res = await Quotes()
return m.reply('*' + res.author + '*' + '\n' + res.quotes)
}
handler.help = ['dicho']
handler.tags = ['quotes']
handler.command = /^(dicho|frase|)$/i

export default handler
