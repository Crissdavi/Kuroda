import { canLevelUp, xpRange } from '../lib/levelling.js'
import { levelup } from '../lib/canvas.js'
import moment from 'moment-timezone'
export async function before(m, { conn }) {
    let user = global.db.data.users[m.sender]
    let chat = global.db.data.chats[m.chat]
    if (m.isGroup && chat.autolevelup && !chat.isBanned) {
        if (canLevelUp(user.level, user.exp, global.multiplier)) {
            let before = user.level * 1
            while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++
            if (before !== user.level) {
                let teks = `.             ${user.role}`
                let str = `
*🎉 C O N G R A T S 🎉*
*${before}* ➔ *${user.level}* [ *${user.role}* ]

*Note:* _Semakin sering berinteraksi dengan bot Semakin Tinggi level kamu_
`.trim()
                try {
                    let img = await levelup(teks, user.level)
                    await conn.sendFile(m.chat, img, 'global.thumblvlup', str, m)
                } catch (e) {
                    let img = await levelup(teks, user.level)
                    await conn.sendFile(m.chat, img, 'global.thumblvlup', str, m)
                }
            }
        }
        return !0
    }
    return !0
}




/* import { xpRange, canLevelUp, findLevel } from '../lib/levelling.js'
import fetch from 'node-fetch'

let handler = m => m
handler.all = async function (m) {
        let user = global.db.data.users[m.sender]
        if (!user.autolevelup)
                return !0
        let users = Object.entries(global.db.data.users).map(([key, value]) => {
                return { ...value, jid: key }
        })
        let pp3 = 'https://pomf2.lain.la/f/29uif8pa.jpg'
        let name = await conn.getName(m.sender)
        let who = m.sender
        let exp = global.db.data.users[m.sender].exp
        let logo = await (await fetch(thumblvlup.getRandom())).buffer()
        let wm = global.author
        let discriminator = who.substring(9, 13)
        let sortedLevel = users.map(toNumber('level')).sort(sort('level'))
        let usersLevel = sortedLevel.map(enumGetKey)
        let { min, xp, max } = xpRange(user.level, global.multiplier)
        let username = conn.getName(who)
        try {
                pp = await conn.profilePictureUrl(conn.user.jid).catch(_ => 'https://pomf2.lain.la/f/29uif8pa.jpg')
        } catch (e) {
        } finally {
                if (!user.autolevelup) return !0
                let before = user.level * 1
                while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++
                if (before !== user.level) {
                        user.role = global.db.data.users[m.sender].role
                        {
                                let tag = `@${m.sender.replace(/@.+/, '')}`
                                conn.sendFile(m.chat, pp3, 'Thumb.jpg', `◪ *Name:* ${name}\n├◆ *Role:* ${user.role}\n├◆ *Exp:* ${exp} xp\n╰◆ *Level:* ${before} ➠ ${user.level}\n`.trim(), m)
                        }
                }
        }
}
export default handler

function sort(property, ascending = true) {
        if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property]
        else return (...args) => args[ascending & 1] - args[!ascending & 1]
}

function toNumber(property, _default = 0) {
        if (property) return (a, i, b) => {
                return { ...b[i], [property]: a[property] === undefined ? _default : a[property] }
        }
        else return a => a === undefined ? _default : a
}

function enumGetKey(a) {
        return a.jid
} */