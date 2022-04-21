
require('dotenv').config();
const {startBot} = require('./telegram/bot');
const {startTasks} = require('./task/task-man');

//init
startTasks().then(()=>startBot());


