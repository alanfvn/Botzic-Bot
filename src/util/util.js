const dateFormat = new Intl.DateTimeFormat('es-ES', {
    timeZone: 'America/Guatemala',
    year: "numeric", month: "2-digit",
    day: "2-digit", hour: "2-digit",
    minute: "2-digit"
});

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

/**
 * 
 * @param {Date} d1 
 * @param {Date} d2 
 * @returns amount of days between the dates provided.
 */
function getDays(d1, d2){
    d1.setHours(0,0,0,0);
    d2.setHours(0,0,0,0);
    return (d2.getTime()-d1.getTime())/(1000*3600*24);
}

/**
 * 
 * @param {String} text 
 * @returns String that complies with Telegram markdown format.
 */
function regexFix(text){
    const reg = new RegExp(/(_|\*|\[|\]|\(|\)|~|`|>|#|\+|-|=|\||{|}|\.|!)/g);
    return text.replaceAll(reg, '\\$&');
}


export {getDays, regexFix, isExpired, dateFormat};
