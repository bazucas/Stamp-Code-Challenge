import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormBuilder} from '@angular/forms';
import {Customer} from '../../models/customer';
import {Company} from '../../models/company';
import {ApiService} from '../../services/api.service';
import {Invoice} from '../../models/invoice';

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
  // get discount() {
  //   return '€' + this.disc;
  // }
  // set discount(value: string) {
  //   this.disc = value;
  // }

  invoiceNo = 'EF123654';
  issuedOn = '22/03/2019';
  invoiceRes = true;

  customer: Customer = {
    country: 'Portugal',
    date: '22/06/1984',
    name: 'Luis Inacio',
    passport: 'PS123456789',
    residency: 'Portugal'
  };

  company: Company = {
    zip: '2790-075 Queluz - PT',
    name: 'Fit4U Ltd.',
    code: 'CD32165488',
    address: 'My own street, 10'
  };

  constructor(private formBuilder: FormBuilder,
              private apiService: ApiService) { }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.showLabels = this.innerWidth > 1000;
  }

  ngOnDestroy() {

  }

  private requestInvoice() {

  }

  private removeRow(index: number) {
    this.products.splice(index, 1);
    this.updateTotals();
  }

  private addNewRow() {
    this.products.push(new Invoice());
  }

  private calculateNet(product) {
    if (product.vat === '') {
      product.vat = this.vatOptions[0].value;
    }
    const priceWithoutVat = product.price - (product.price * (+product.vat / 100));
    product.net = (+product.quantity * priceWithoutVat).toString();
    this.updateTotals();
  }

  private updateTotals() {
    this.subtotal = '0.00';
    this.total = '0.00';
    this.products.forEach(el => {
      this.subtotal = (+this.subtotal + +el.net).toString();
    });
    this.total = (+this.subtotal - +this.discount).toString();
  }
}
