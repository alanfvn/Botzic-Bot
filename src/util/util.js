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

module.exports = {
    isExpired,
    getDays
}