import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Customer} from '../../models/customer';
import {Company} from '../../models/company';
import {ApiService} from '../../services/api.service';
import {Invoice} from '../../models/invoice';
import {Subscription} from 'rxjs';
import {ApiRequest, Item} from '../../models/apiRequest';
import {ApiResponse} from '../../models/apiResponse';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
  animations: [
    trigger('animation', [
      state('visible', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('void => *', [
        style({transform: 'translateX(50%)', opacity: 0}),
        animate('300ms ease-out')
      ]),
      transition('* => void', [
        animate(('250ms ease-in'), style({
          height: 0,
          opacity: 0,
          transform: 'translateX(50%)'
        }))
      ])
    ])
  ],
  encapsulation: ViewEncapsulation.None
})
export class InvoiceComponent implements OnInit, OnDestroy {

  @ViewChild('code') codeInputRef;
  @ViewChild('description') descriptionInputRef;
  @ViewChild('quantity') quantityInputRef;
  @ViewChild('price') priceInputRef;
  @ViewChild('disc') discountInputRef;

  isFormValid = false;
  responseError = false;
  apiServiceSubs: Subscription;
  innerWidth = 0;
  showLabels = true;
  vatOptions: {label: string, value: string}[] = [
    {label: '22%', value: '22'},
    {label: '10%', value: '10'},
    {label: '5%', value: '5'},
    {label: '4%', value: '4'}
  ];

  products: Invoice[] = [new Invoice()];
  subtotal = '0.00';
  total = '0.00';
  discount = '';

  invoiceNo = 'EF123654';
  issuedOn = '22/03/2019';
  invoiceRes = false;

  private readonly customer: Customer = {
    country: 'Portugal',
    date: '22/06/1984',
    name: 'Luis Inacio',
    passport: 'PS123456789',
    residency: 'Portugal'
  };

  private readonly company: Company = {
    zip: '2790-075 Queluz - PT',
    name: 'Fit4U Ltd.',
    code: 'CD32165488',
    address: 'My own street, 10'
  };

  constructor(private apiService: ApiService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.showLabels = this.innerWidth > 1000;
  }

  ngOnDestroy() {
    if (this.apiServiceSubs) {
      this.apiServiceSubs.unsubscribe();
    }
  }

   requestInvoice(): void  {
    const req: ApiRequest = this.createRequest();
    this.apiServiceSubs = this.apiService.setNewObject<ApiRequest, ApiResponse>('invoices', req).subscribe(
      res => {
        this.invoiceRes = true;
        this.invoiceNo = res.invoiceNumber;
        this.issuedOn = new Date(new Date(res.issuedOn)).toLocaleString().slice(0, 10);
        this.responseError = true;
        this.toastr.success('Form submitted', 'Success');
        },
      error => this.toastr.error('Error - ' + error.error.message, 'Error'),
      () => {}
    );
  }

  addNewRow(): void  {
    if (this.responseError) {
      return ;
    }
    this.products.push(new Invoice());
  }

  removeRow(index: number): void  {
    if (this.responseError) {
      return ;
    }
    this.products.splice(index, 1);
    this.updateTotals();
  }

  calculateNet(product): void  {
    if (product.vat === '') {
      product.vat = this.vatOptions[0].value;
    }
    const priceWithoutVat = product.price - (product.price * (+product.vat / 100));
    product.net = (+product.quantity * priceWithoutVat).toString();
    this.updateTotals();
  }

  updateTotals(): void  {
    this.resetSubtotals();
    this.total = (+this.subtotal - +this.discount).toString();
    this.validateForm();
  }

  roundCents(): void  {
    if (this.responseError) {
      return ;
    }
    this.resetSubtotals();
    const subtotalWithoutCents = Math.floor(+this.subtotal);
    this.total = (subtotalWithoutCents - +this.discount).toString();
    this.validateForm();
  }

  resetSubtotals(): void  {
    this.subtotal = '0.00';
    this.total = '0.00';
    this.products.forEach(el => {
      this.subtotal = (+this.subtotal + +el.net).toString();
    });
  }

  createRequest(): ApiRequest {
    const itemCollection: Item[] = [];
    this.products.forEach(prod => {
      const item: Item = {
        code: prod.code,
        description: prod.description,
        quantity: +prod.quantity,
        unitPriceWithVat: +prod.price,
        vatRate: +prod.vat
      };
      itemCollection.push(item);
    });
    return {
      discount: +this.discount,
      items: itemCollection
    };
  }

  validateForm(): void {
    this.isFormValid = false;
    this.isFormValid = this.codeInputRef.control.status === 'VALID' &&
                       this.descriptionInputRef.control.status === 'VALID' &&
                       this.quantityInputRef.control.status === 'VALID' &&
                       this.priceInputRef.control.status === 'VALID' &&
                       this.discountInputRef.control.status === 'VALID' &&
                       +this.total > 0;
  }
}
