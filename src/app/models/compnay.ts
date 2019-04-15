export class Company {
  name: string;
  code: string;
  address: string;
  zip: string;

  constructor(value) {
    this.address = value.address;
    this.code = value.code;
    this.name = value.name;
    this.zip = value.zip;
  }
}
