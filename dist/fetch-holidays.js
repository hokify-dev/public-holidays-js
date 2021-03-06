"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const got = require("got");
const ical = require('ical');
function fetchHolidays(url, timeout) {
    timeout = timeout || 5000;
    return got(url, {
        method: 'GET',
        timeout,
    })
        .then(response => {
        if (response.statusCode && response.statusCode >= 400) {
            throw new Error("Bad response from server");
        }
        return response.body;
    })
        .then(data => ical.parseICS(data));
}
exports.fetchHolidays = fetchHolidays;
