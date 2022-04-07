export default class Datapoint {
    year: string;
    month: string;
    day: string;
    hour: string;
    production: number;

    constructor(year: string, month: string, day: string, hour: string, production: string) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.hour = hour;
        this.production = parseFloat(production);
    }

    referencesSamePeriod(dp: Datapoint) {
        return this.year == dp.year && this.month == dp.month && this.day == dp.day && this.hour == dp.hour;
    }

    merge(dp: Datapoint) {
        this.production += dp.production;
    }
}
