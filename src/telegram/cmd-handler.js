const {
    getCalendar, formatEvent, 
    getEventDesc
} = require('../calendar/ical-man');


const start = async (ctx) =>{
    await ctx.replyWithMarkdownV2(
        '*Lista de comandos*\n'+
        '/tareas \\- ver la lista de tareas\n'+
        '/notificar \\- activar/desactivar notificaciones\n'+
        '/info \\- ver información detallada de una actividad'
    ); 
}

const tareas = async (ctx) =>{
    const data = getCalendar();
    if(Object.keys(data).length === 0){
        await ctx.replyWithMarkdownV2('No hay tareas 👌');
        return;
    }
    const msgs = taskFormat(data);
    await ctx.replyWithMarkdownV2('*Tareas*');
    await ctx.replyWithMarkdownV2(msgs);
}

const info = async (ctx) =>{
    const cmd = ctx.update.message.text;
    const args = cmd.split(' ');

    if(args.length != 2){
        await ctx.replyWithMarkdownV2('_*❗Uso correcto /info <id\\-evento\\>*_')
        return;
    }
    let desc = getEventDesc(args[1]);
    await ctx.reply(desc);
}

const notificar = async (ctx) =>{
    await ctx.reply('En construcción...');
}


function taskFormat(data){
    const ev = Object.values(data).map(x => formatEvent(x));
    let task = ev.join("\n\n");
    //lil hack.
    if(task.length > 4096){
        task = task.substring(0, 4096);
    }
    return task;
}


module.exports = {
    start,info,
    tareas, notificar
}