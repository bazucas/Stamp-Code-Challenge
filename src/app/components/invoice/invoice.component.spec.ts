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
  });
