import {Telegraf} from 'telegraf';
import {start, info, tareas, notificar} from './cmd-handler.js';

const bot = new Telegraf(process.env.TELE_TOKEN);

//commands
bot.start(start);
bot.command('tareas', tareas);
bot.command('notificar', notificar);
bot.hears(new RegExp(/^\/info_[0-9]+$/i), info);

const startBot = () => bot.launch().then(() => console.log('Bot has started!'));
export default startBot;
