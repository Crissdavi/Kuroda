let handler = m => m

handler.before = async function (m) {
    if (!/^-?[0-9]+(\.[0-9]+)?$/.test(m.text)) return !0
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.text || !/^Cual es la respues ya de/i.test(m.quoted.text)) return !0
    this.math = this.math ? this.math : {}
    if (!(id in this.math)) return conn.reply(m.chat, 'Tu pregunta ha terminado', m)
    if (m.quoted.id == this.math[id][0].id) {
        let math = JSON.parse(JSON.stringify(this.math[id][1]))
        if (m.text == math.result) {
            global.db.data.users[m.sender].exp += math.bonus
            clearTimeout(this.math[id][3])
            delete this.math[id]
            conn.reply(m.chat, `*Respuesta correcta!*\n+${math.bonus} XP`, m)
            conn.sendFile(m.chat, 'https://cdn.pnghd.pics/data/904/simbol-ceklis-png-22.jpg', 'jawaban_benar.jpg', 'Felicidades, tu respuesta es correcta ', m)
        } else {
            if (--this.math[id][2] == 0) {
                clearTimeout(this.math[id][3])
                delete this.math[id]
                conn.reply(m.chat, `Tu oportunidad ha acabado!*\nJawaban: *${math.result}*`, m)
            } else conn.reply(m.chat, `*Respuesta incorrecta!*\nTodavia hay ${this.math[id][2]} oportunidad`, m)
          conn.sendFile(m.chat, 'https://cdn.pnghd.pics/data/559/gambar-tanda-silang-0.jpg', 'jawaban_salah.jpg', 'Lastima, tu respuesta es incorecta!', m)
        }
    }
    return !0
}

export default handler
