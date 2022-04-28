const ical = require('node-ical');
const {getDays, isExpired, regexFix} = require('../util/util');
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
    return Object.fromEntries(Object
        .entries(calData)
        .filter(([uid, event]) => validEvent(uid, event))
    );
}

function validEvent(_key, event){
    if(event["type"] !== 'VEVENT') return false

    const now = new Date();
    const date = new Date(Date.parse(event["end"]));
    //why did this teacher create a thousand events????
    const discard = event["summary"]?.includes("Sesión #");
    const expired = isExpired(now, date);
    //check if the event is within two weeks from now.
    const tooFar = getDays(now, date) > (2*7);

    /*
        NOTE: we only verify the part of the date 
        because sometimes the "end" property does 
        not return the time.
    */
    return !discard && !expired && !tooFar
}

/**
 * 
 * @param {any} event 
 * @returns String with a format containing the 
 * main information of the event
 */
function formatEvent(event){
    let uid = event["uid"]
    let name = event["summary"];

    uid = regexFix(uid.substr(
        uid.lastIndexOf('-')+1, uid.length)
    );
    //sanitize the string.
    name = regexFix(
            name.substr(0, name.lastIndexOf(' '))
    ).trim().toUpperCase();

    let date = new Date(Date.parse(event["end"])
    ).toLocaleString('es-ES', {
        timeZone: 'America/Guatemala'
    });

    return `📗 *${name}*\n
    🕐 Expira: ${date}
    🔍 UID: \`/info ${uid}\``
}

function getEventDesc(uid){
    let evId = 'event-assignment-'+uid;

    if(!(evId in calData)){
        evId = 'event-calendar-event-'+uid;
    }
    const event = calData[evId];

    if(!event){
        return 'Actividad no encontrada!';
    }
    return event.description;
}



module.exports = {
    fetchCalendar,
    getCalendar,
    getEventDesc,
    formatEvent
}