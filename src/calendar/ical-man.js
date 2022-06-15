import ical from 'node-ical';
import {getDays, isExpired, regexFix, dateFormat} from '../util/util.js';
const cal_url = process.env.CALENDAR;

let calData = null;

async function fetchCalendar(){
    const data = await ical.async.fromURL(cal_url);
    const fdata = filterData(data);
    calData = fdata;
}

function getCalendar(){
    return calData;
}

function filterData(calData){
    return Object.fromEntries(Object.entries(calData).filter(([uid, event]) => validEvent(uid, event)));
}

function validEvent(_key, event){
    const {type, summary, end} = event;
    if(type !== 'VEVENT') return false
    const now = new Date();
    const discard = discardEvent(summary);
    const tooFar = getDays(now,end);
    const expired = isExpired(now, end);

    return !discard && !expired && !tooFar
}

function discardEvent(eventName){
    const discardList = ["Sesión #"];
    return discardList.includes(eventName);
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

export {fetchCalendar, getCalendar, getEventDesc, formatEvents}
