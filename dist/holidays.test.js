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
const ava_1 = require("ava");
const holidays_1 = require("./holidays");
ava_1.default('should get holidays by known country code', (t) => __awaiter(this, void 0, void 0, function* () {
    const holidays = yield holidays_1.getHolidays({ country: 'ro', lang: 'ro' });
    t.truthy(holidays);
    t.truthy(holidays.length);
    t.true(typeof holidays[0].date === 'object');
    t.true(typeof holidays[0].name === 'string');
    t.true(holidays[0].date < holidays[1].date);
}));
ava_1.default('should get holidays by unknown country code', (t) => __awaiter(this, void 0, void 0, function* () {
    const holidays = yield holidays_1.getHolidays({ country: 'md', lang: 'ro' });
    t.truthy(holidays);
    t.truthy(holidays.length);
}));
ava_1.default('should throw error for unsupported locale sua:ro', (t) => __awaiter(this, void 0, void 0, function* () {
    yield t.throws(holidays_1.getHolidays({ country: 'sua', lang: 'ro' }));
}));
ava_1.default('should filter holidays by end date', (t) => __awaiter(this, void 0, void 0, function* () {
    const end = new Date();
    const holidays = yield holidays_1.getHolidays({ country: 'ro', lang: 'ro', end });
    t.truthy(holidays.length);
    end.setMonth(end.getMonth() + 6);
    const holidays2 = yield holidays_1.getHolidays({ country: 'ro', lang: 'ro', end });
    t.truthy(holidays2.length);
    t.true(holidays2.length > holidays.length);
}));
ava_1.default('should get holidays za->sa (South African -> sa code!)', (t) => __awaiter(this, void 0, void 0, function* () {
    const holidays = yield holidays_1.getHolidays({ country: 'za', lang: 'en' });
    t.truthy(holidays);
    t.truthy(holidays.length);
}));
ava_1.default('should get holidays sa->saudiarabian', (t) => __awaiter(this, void 0, void 0, function* () {
    const holidays = yield holidays_1.getHolidays({ country: 'sa', lang: 'en' });
    t.truthy(holidays);
    t.truthy(holidays.length);
}));
