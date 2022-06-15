import "dotenv/config.js"
import startBot from './telegram/bot.js'
import startTasks from './task/task-man.js'

startTasks().then(()=>startBot());
