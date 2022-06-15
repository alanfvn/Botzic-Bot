import {fetchCalendar} from '../calendar/ical-man.js';
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

export default startTasks;
