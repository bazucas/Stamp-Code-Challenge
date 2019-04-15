export class ApiRequest {
  discount: number;
  items: Item[];

  constructor(value: ApiRequest) {
    this.discount = value.discount;
    this.items = value.items;
  }
}

export class Item {
  code: string;
  description: string;
  quantity: number;
  unitPriceWithVat: number;
  vatRate: number;

  constructor(value: Item) {
    this.code = value.code;
    this.description = value.description;
    this.quantity = value.quantity;
    this.unitPriceWithVat = value.unitPriceWithVat;
    this.vatRate = value.vatRate;
  }
}
