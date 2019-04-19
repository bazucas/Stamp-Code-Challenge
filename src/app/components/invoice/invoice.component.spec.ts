import {ComponentFixture, TestBed} from '@angular/core/testing';
import { InvoiceComponent } from './invoice.component';
import {ApiService} from '../../services/api.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PanelModule} from 'primeng/panel';
import {ButtonModule} from 'primeng/button';
import {DropdownModule, InputTextModule} from 'primeng/primeng';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import {of} from 'rxjs';
import {Invoice} from '../../models/invoice';
import {ApiRequest} from '../../models/apiRequest';

describe('InvoiceComponent', () => {
  let component: InvoiceComponent;
  let fixture: ComponentFixture<InvoiceComponent>;
  let testBedService: ApiService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [InvoiceComponent],
      imports: [HttpClientTestingModule,
                BrowserModule,
                FormsModule,
                CommonModule,
                BrowserAnimationsModule,
                PanelModule,
                ButtonModule,
                InputTextModule,
                ReactiveFormsModule,
                DropdownModule,
                CurrencyMaskModule
      ],
      providers: [ApiService]
    });
    fixture = TestBed.createComponent(InvoiceComponent);
    component = fixture.componentInstance;
    testBedService = TestBed.get(ApiService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run ngOnInit', () => {
    component.ngOnInit();
    expect(component.innerWidth).toBeGreaterThan(0);
  });

  it('should unsubscribe from ApiService', () => {
    component.requestInvoice();
    spyOn(component.apiServiceSubs, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.apiServiceSubs.unsubscribe).toHaveBeenCalledTimes(1);
  });

  it('should set invoice properties with the items returned from the server', () => {
    const response = {
      invoiceNumber: '1',
      issuedOn: '2',
      invoiceRes: true
    };

    spyOn(testBedService, 'setNewObject').and.callFake(() => {
      return of(response);
    });

    component.requestInvoice();
    expect(component.invoiceNo).toBe(response.invoiceNumber);
    expect(component.issuedOn).toBe(response.issuedOn);
    expect(component.invoiceRes).toBeTruthy();
    });

  it('should add an Invoice object to the products array', () => {
    component.products = [];
    component.addNewRow();
    expect(component.products.length).toBe(1);
    expect(component.products[0] instanceof Invoice).toBeTruthy();
  });

  it('should remove object from the products array and validate form', () => {
    const invoice: Invoice = {
      vat: '10',
      price: '10',
      quantity: '10',
      description: 'tests',
      code: 'tests',
      net: '10'
    };
    const inputRef = {
      control: {
        status: 'VALID'
      }
    };
    component.codeInputRef = inputRef;
    component.descriptionInputRef = inputRef;
    component.quantityInputRef = inputRef;
    component.priceInputRef = inputRef;
    component.discountInputRef = inputRef;
    component.discount = '10.0';
    component.products = [invoice, invoice, invoice];
    expect(component.products.length).toBe(3);
    component.removeRow(0);
    expect(component.products.length).toBe(2);
    expect(component.total).toBe('10');
    expect(component.isFormValid).toBeTruthy();
  });

  it('should calculate Net value over default vat value', () => {
    const invoice: Invoice = {
      vat: '10',
      price: '10',
      quantity: '10',
      description: 'tests',
      code: 'tests',
      net: '11.5'
    };
    const inputRef = {
      control: {
        status: 'VALID'
      }
    };

    component.codeInputRef = inputRef;
    component.descriptionInputRef = inputRef;
    component.quantityInputRef = inputRef;
    component.priceInputRef = inputRef;
    component.discountInputRef = inputRef;
    component.discountInputRef = inputRef.control.status = 'INVALID';

    component.products = [invoice, invoice, invoice];
    component.roundCents();
    expect(component.isFormValid).toBeFalsy();
    expect(component.subtotal).toBe('34.5');
    expect(component.total).toBe( (Math.floor(+component.subtotal) - +component.discount).toString());
  });

  it('should create an ApiRequest object', () => {
    const invoice: Invoice = {
      vat: '10',
      price: '10',
      quantity: '10',
      description: 'tests',
      code: 'tests',
      net: '11.5'
    };
    component.products = [invoice, invoice, invoice];

    const result: ApiRequest = component.createRequest();
    expect(result.items.length).toBe(3);
  });
});
