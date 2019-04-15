import {ApiRequest} from './apiRequest';

export class ApiResponse extends ApiRequest {
  invoiceNumber: string;
  issuedOn: string;

  constructor(value: ApiResponse) {
    super(value);
    this.invoiceNumber = value.invoiceNumber;
    this.issuedOn = value.issuedOn;
  }
}
