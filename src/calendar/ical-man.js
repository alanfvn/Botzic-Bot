const ical = require('node-ical');
const CAL_URL = process.env.CALENDAR;
let calData = null;

async function fetchCalendar(){
    const data = await ical.async.fromURL(CAL_URL);
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
    /*
        NOTE: we only verify the part of the date 
        because sometimes the "end" property does 
        not return the time.
    */
    return !discard && !isExpired(now, date);
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
    ).toLocaleString();

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

//================= UTIL =================
function regexFix(text){
    const reg = new RegExp(/(_|\*|\[|\]|\(|\)|~|`|>|#|\+|-|=|\||{|}|\.|!)/g);
    return text.replaceAll(reg, '\\$&');
}

/**
 * 
 * @param {Date} d1 
 * @param {Date} d2 
 * @returns boolean to check if 
 * dates are within the same day or ahead.
 */
function isExpired(d1, d2){
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);
    return d1.getTime() > d2.getTime();
}

module.exports = {
    fetchCalendar,
    getCalendar,
    getEventDesc,
    formatEvent
}