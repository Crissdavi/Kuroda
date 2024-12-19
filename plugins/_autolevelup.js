/* import { xpRange, canLevelUp } from '../lib/levelling.js';
import fetch from 'node-fetch';

let handler = m => m;

handler.all = async function (m) {
    // Asegurarse de que el usuario existe en la base de datos
    let user = global.db.data.users[m.sender] || {};
    user.role = user.role || "Novato"; // Rol predeterminado si no está definido
    user.level = Number(user.level) || 0; // Nivel inicial
    user.exp = Number(user.exp) || 0; // Experiencia inicial

    // Si el usuario no tiene autolevelup activado, salir
    if (!user.autolevelup) return true;

    // Preparar datos adicionales
    let name = await conn.getName(m.sender);
    let pp3 = 'https://pomf2.lain.la/f/29uif8pa.jpg'; // Imagen predeterminada
    let exp = user.exp;
    let { min, xp, max } = xpRange(user.level, global.multiplier || 1); // Calcular rango de XP

    // Intentar obtener la foto de perfil del usuario
    let pp;
    try {
        pp = await conn.profilePictureUrl(m.sender).catch(() => pp3);
    } catch {
        pp = pp3;
    }

    // Verificar si puede subir de nivel
    let before = user.level;
    while (canLevelUp(user.level, user.exp, global.multiplier || 1)) {
        user.level++;
    }

    // Si subió de nivel, enviar notificación
    if (before !== user.level) {
        let tag = `@${m.sender.replace(/@.+/, '')}`;
        conn.sendFile(
            m.chat, 
            pp, 
            'Thumb.jpg', 
            `◪ *Nombre:* ${name}\n` +
            `├◆ *Rol:* ${user.role}\n` +
            `├◆ *Exp:* ${exp} XP\n` +
            `╰◆ *Nivel:* ${before} ➠ ${user.level}\n`.trim(), 
            m
        );
    }
};

export default handler;

// Función para ordenar elementos
function sort(property, ascending = true) {
    if (property) {
        return (...args) => args[ascending & 1][property] - args[!ascending & 1][property];
    } else {
        return (...args) => args[ascending & 1] - args[!ascending & 1];
    }
}

// Función para convertir valores a número
function toNumber(property, _default = 0) {
    if (property) {
        return (a, i, b) => ({
            ...b[i],
            [property]: a[property] === undefined ? _default : a[property],
        });
    } else {
        return a => (a === undefined ? _default : a);
    }
}

// Función para obtener el identificador único de un usuario
function enumGetKey(a) {
    return a.jid;
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