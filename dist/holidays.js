"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_holidays_1 = require("./fetch-holidays");
const url_1 = require("./url");
function getHolidays(options) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof options !== 'object') {
            throw new TypeError('`options` param is invalid');
        }
        const url = url_1.formatCalendarUrl(options.country, options.lang);
        const holidaysData = yield fetch_holidays_1.fetchHolidays(url, options.timeout);
        const holidaysList = [];
        if (options.start || options.end) {
            for (let id in holidaysData) {
                if (!passFilter(holidaysData[id], options)) {
                    delete holidaysData[id];
                }
            }
        }
        for (let id in holidaysData) {
            holidaysList.push({
                date: holidaysData[id].start,
                name: holidaysData[id].summary,
            });
        }
        return holidaysList.sort((a, b) => a.date.getTime() - b.date.getTime());
    });
}
exports.getHolidays = getHolidays;
function passFilter(holiday, options) {
    if (options.start && holiday.start < options.start) {
        return false;
    }
    if (options.end && holiday.start > options.end) {
        return false;
    }
    return true;
}
