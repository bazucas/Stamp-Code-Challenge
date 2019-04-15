export class Customer {
  name: string;
  date: string;
  passport: string;
  country: string;
  residency: string;

  constructor(value) {
    this.name = value.name;
    this.date = value.date;
    this.passport = value.passport;
    this.country = value.country;
    this.residency = value.residency;
  }
}
