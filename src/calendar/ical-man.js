import ical from 'node-ical';
import {getDays, isExpired, regexFix, dateFormat} from '../util/util.js';
const cal_url = process.env.CALENDAR;

let calData = null;

async function fetchCalendar(){
    const data = await ical.async.fromURL(cal_url);
    calData = filterData(data);
}

function filterData(calData){
    return Object.fromEntries(Object.entries(calData).filter(([uid, event]) => validEvent(uid, event)));
}

function validEvent(_key, event){
    const {type, end} = event;
    if(type !== 'VEVENT') return false

    const now = new Date();
    const tooFar = getDays(now,end) > 14;
    const expired = isExpired(now, end);

    return !expired && !tooFar 
}


function formatEvents(events){
    let formatted = "📝 *TAREAS:*\n\n"

    const evs = Object.values(events).map(ev=>{
        const {uid, summary, end} = ev;
        const evId = regexFix(uid.substr(uid.lastIndexOf('-')+1, uid.length));
        const evName = regexFix(summary.substr(0, summary.lastIndexOf(' '))).trim().toUpperCase();
        return `📗 *${evName}* 
    🕐 Expira: ${dateFormat.format(end)}
    🗒️ Descripción: \\/info\\_${evId}`
    });

    formatted += evs.length > 0 ? evs.join('\n\n') : "No hay tareas 👌";
    return formatted;
}

function getEventDesc(uid){
    const ev = `event-assignment-${uid}`
    const id =  !(ev in calData) ? `event-calendar-event-${uid}` : ev;
    const event = calData[id];
    const desc = event?.description ?? "Descripción no encontrada.";
    return desc;
}

function getCalendar(){
    return calData;
}

export {fetchCalendar, getCalendar, getEventDesc, formatEvents}
