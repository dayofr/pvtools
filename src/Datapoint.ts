export default class Datapoint {
  year: string;
  month: string;
  day: string;
  hour: string;
  production: number;

  constructor(
    year: string,
    month: string,
    day: string,
    hour: string,
    production: string
  ) {
    this.year = year;
    this.month = month;
    this.day = day;
    this.hour = hour;
    this.production = parseFloat(production);
  }
}
