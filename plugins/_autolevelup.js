import { xpRange } from '../lib/levelling.js';

function canLevelUp(level, exp, multiplier) {
    // Calcula el umbral de experiencia que necesitas para subir de nivel
    const requiredExp = 200; // Puedes cambiar este valor según tus necesidades
    return exp >= requiredExp;
}

let handler = m => m;

handler.all = async function (m) {
    let user = global.db.data.users[m.sender] || {};
    user.role = user.role || "Novato"; 
    user.level = Number(user.level) || 0; 
    user.exp = Number(user.exp) || 0; 

    if (!user.autolevelup) return true;

    let name = await conn.getName(m.sender);
    let defaultPP = 'https://pomf2.lain.la/f/29uif8pa.jpg'; 
    let pp;
    try {
        pp = await conn.profilePictureUrl(m.sender).catch(() => defaultPP);
    } catch {
        pp = defaultPP;
    }

    let before = user.level;
    let exp = user.exp;

    while (canLevelUp(user.level, user.exp, global.multiplier || 1)) {
        user.level++;

        let { min, xp, max } = xpRange(user.level, global.multiplier || 1);
        await new Promise(resolve => setTimeout(resolve, 2000)); 

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

        before = user.level;
    }
};

export default handler;