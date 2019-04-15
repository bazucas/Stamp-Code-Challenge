export class Invoice {
  code: string;
  description: string;
  quantity: string;
  price: string;
  vat: string;
  net: string;

  constructor(value?) {
    this.code = value ? value.code : '';
    this.description = value ? value.description : '';
    this.quantity = value ? value.quantity : '1';
    this.price = value ? value.price : '';
    this.vat = value ? value.vat : '';
    this.net = value ? value.net : '0.00';
  }
}
