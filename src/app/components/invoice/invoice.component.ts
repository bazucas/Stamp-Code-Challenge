import {Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Customer} from '../../models/customer';
import {Company} from '../../models/company';
import {ApiService} from '../../services/api.service';
import {Invoice} from '../../models/invoice';
import {Subscription} from 'rxjs';
import {ApiRequest, Item} from '../../models/apiRequest';
import {ApiResponse} from '../../models/apiResponse';

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

  private isFormValid = false;
  private apiServiceSubs: Subscription;
  private innerWidth = 0;
  private showLabels = true;
  private readonly vatOptions: {label: string, value: string}[] = [
    {label: '22%', value: '22'},
    {label: '10%', value: '10'},
    {label: '5%', value: '5'},
    {label: '4%', value: '4'}
  ];

  private products: Invoice[] = [new Invoice()];
  private subtotal = '0.00';
  private total = '0.00';
  private discount = '';

  private invoiceNo = 'EF123654';
  private issuedOn = '22/03/2019';
  private invoiceRes = false;

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

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.showLabels = this.innerWidth > 1000;
  }

  ngOnDestroy() {
    if (this.apiServiceSubs) {
      this.apiServiceSubs.unsubscribe();
    }
  }

  private requestInvoice(): void  {
    const req: ApiRequest = this.createRequest();
    this.apiServiceSubs = this.apiService.setNewObject<ApiRequest, ApiResponse>('invoices', req).subscribe(
      res => {
        this.invoiceRes = true;
        this.invoiceNo = res.invoiceNumber;
        this.issuedOn = res.issuedOn;
        },
      error => {},
      () => {}
    );
  }

  private removeRow(index: number): void  {
    this.products.splice(index, 1);
    this.updateTotals();
  }

  private addNewRow(): void  {
    this.products.push(new Invoice());
  }

  private calculateNet(product): void  {
    if (product.vat === '') {
      product.vat = this.vatOptions[0].value;
    }
    const priceWithoutVat = product.price - (product.price * (+product.vat / 100));
    product.net = (+product.quantity * priceWithoutVat).toString();
    this.updateTotals();
  }

  private updateTotals(): void  {
    this.resetSubtotals();
    this.total = (+this.subtotal - +this.discount).toString();
    this.validateForm();
  }

  private roundCents(): void  {
    this.resetSubtotals();
    const subtotalWithoutCents = Math.floor(+this.subtotal);
    this.total = (subtotalWithoutCents - +this.discount).toString();
    this.validateForm();
  }

  private resetSubtotals(): void  {
    this.subtotal = '0.00';
    this.total = '0.00';
    this.products.forEach(el => {
      this.subtotal = (+this.subtotal + +el.net).toString();
    });
  }

  private createRequest(): ApiRequest {
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

  private validateForm(): void {
    this.isFormValid = false;
    this.isFormValid = this.codeInputRef.control.status === 'VALID' &&
                       this.descriptionInputRef.control.status === 'VALID' &&
                       this.quantityInputRef.control.status === 'VALID' &&
                       this.priceInputRef.control.status === 'VALID' &&
                       this.discountInputRef.control.status === 'VALID' &&
                       this.total !== '0';
  }
}
