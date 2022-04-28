const { Telegraf } = require("telegraf");
const {start, info, tareas, notificar} = require('./cmd-handler');
const bot = new Telegraf(process.env.TELE_TOKEN);

//commands
bot.start(start);
bot.command('info', info);
bot.command('tareas', tareas);
bot.command('notificar', notificar);



const startBot = () => bot.launch().then(() => console.log('Bot has started!'));

module.exports = {
    startBot
}