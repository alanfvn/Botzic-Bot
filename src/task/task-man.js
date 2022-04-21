const {fetchCalendar} = require('../calendar/ical-man');

/*
    TODO: 
    Create a notification system for new events
    or events close to expire.
*/

async function startTasks(){
    await fetchCalendar();
    setInterval(async () => {
        await fetchCalendar();
    }, 1000*60*5);
}

module.exports = {
    startTasks,
}