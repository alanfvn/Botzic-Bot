import {getCalendar, getEventDesc, formatEvents} from '../calendar/ical-man.js';

const start = async (ctx) =>{
    await ctx.replyWithMarkdownV2(
        '*Lista de comandos*\n'+
        '/tareas \\- ver la lista de tareas\n'+
        '/notificar \\- activar/desactivar notificaciones\n'
    ); 
}

const tareas = async (ctx) =>{
    const calData = getCalendar();
    const msgs = formatEvents(calData);
    await ctx.replyWithMarkdownV2(msgs);
}

const info = async (ctx) =>{
    const cmd = ctx.update.message.text;
    const args = cmd.split('_');
    const desc = getEventDesc(args[1]);
    await ctx.reply(desc);
}

const notificar = async (ctx) =>{
    await ctx.reply('En construcción...');
}


export {start, tareas, info, notificar};
