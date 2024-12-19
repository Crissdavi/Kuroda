import { xpRange, canLevelUp } from '../lib/levelling.js'; // Se mantiene la importación original
import fetch from 'node-fetch';

// Establecemos la cantidad de XP adicional por nivel
const xpPerLevel = 200;

// Modificamos la función xpRange para que devuelva la lógica acumulativa de XP
export function xpRange(level) {
    const xpRequired = level * xpPerLevel;  // XP total necesario para alcanzar el nivel actual
    return {
        min: xpRequired - xpPerLevel, // XP mínimo necesario para el nivel
        xp: xpRequired,               // XP necesario para alcanzar el nivel
        max: (level + 1) * xpPerLevel // XP necesario para el siguiente nivel
    };
}

// Modificamos canLevelUp para usar la nueva lógica de experiencia
export function canLevelUp(level, exp, multiplier = 1) {
    const { max } = xpRange(level); // Verifica si la experiencia del usuario supera el XP necesario para el siguiente nivel
    return exp >= max;
}

let handler = m => m;

handler.all = async function (m) {
    // Verificar si el usuario existe en la base de datos
    let user = global.db.data.users[m.sender] || {};
    user.role = user.role || "Novato"; // Rol predeterminado si no está definido
    user.level = Number(user.level) || 0; // Nivel inicial
    user.exp = Number(user.exp) || 0; // Experiencia inicial

    // Si el usuario no tiene activado el autolevelup, salir
    if (!user.autolevelup) return true;

    // Preparar datos adicionales
    let name = await conn.getName(m.sender);
    let defaultPP = 'https://pomf2.lain.la/f/29uif8pa.jpg'; // Imagen predeterminada
    let pp;
    try {
        pp = await conn.profilePictureUrl(m.sender).catch(() => defaultPP);
    } catch {
        pp = defaultPP;
    }

    let before = user.level; // Nivel inicial antes de posibles cambios
    let exp = user.exp; // Experiencia actual del usuario

    // Ciclo para subir niveles en orden (uno por vez)
    while (canLevelUp(user.level, user.exp, global.multiplier || 1)) {
        user.level++; // Incrementar nivel

        // Notificar cada nivel ganado de forma individual
        let { min, xp, max } = xpRange(user.level); // Obtener el rango de XP para el nivel
        await new Promise(resolve => setTimeout(resolve, 2000)); // Pausa de 2 segundos entre niveles
        conn.sendFile(
            m.chat,
            pp,
            'Nivel.jpg',
            `◪ *Nombre:* ${name}\n` +
            `├◆ *Rol:* ${user.role}\n` +
            `├◆ *Exp:* ${exp} XP\n` +
            `╰◆ *Nivel:* ${before} ➠ ${user.level}\n`.trim(),
            m
        );

        before = user.level; // Actualizar el nivel previo
    }
};

export default handler;





/* import { xpRange, canLevelUp } from '../lib/levelling.js';
import fetch from 'node-fetch';

let handler = m => m;

handler.all = async function (m) {
    // Verificar si el usuario existe en la base de datos
    let user = global.db.data.users[m.sender] || {};
    user.role = user.role || "Novato"; // Rol predeterminado si no está definido
    user.level = Number(user.level) || 0; // Nivel inicial
    user.exp = Number(user.exp) || 0; // Experiencia inicial

    // Si el usuario no tiene activado el autolevelup, salir
    if (!user.autolevelup) return true;

    // Preparar datos adicionales
    let name = await conn.getName(m.sender);
    let defaultPP = 'https://pomf2.lain.la/f/29uif8pa.jpg'; // Imagen predeterminada
    let pp;
    try {
        pp = await conn.profilePictureUrl(m.sender).catch(() => defaultPP);
    } catch {
        pp = defaultPP;
    }

    let before = user.level; // Nivel inicial antes de posibles cambios
    let exp = user.exp; // Experiencia actual del usuario

    // Ciclo para subir niveles en orden (uno por vez)
    while (canLevelUp(user.level, user.exp, global.multiplier || 1)) {
        user.level++; // Incrementar nivel

        // Notificar cada nivel ganado de forma individual
        let { min, xp, max } = xpRange(user.level, global.multiplier || 1);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Pausa de 2 segundos entre niveles
        conn.sendFile(
            m.chat,
            pp,
            'Nivel.jpg',
            `◪ *Nombre:* ${name}\n` +
            `├◆ *Rol:* ${user.role}\n` +
            `├◆ *Exp:* ${exp} XP\n` +
            `╰◆ *Nivel:* ${before} ➠ ${user.level}\n`.trim(),
            m
        );

        before = user.level; // Actualizar el nivel previo
    }
};

export default handler; */