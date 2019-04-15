import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PanelModule} from 'primeng/panel';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';

import { AppComponent } from './app.component';
import {ButtonModule} from 'primeng/button';
import {DropdownModule, InputTextModule} from 'primeng/primeng';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { InvoiceComponent } from './components/invoice/invoice.component';
import {CurrencyMaskModule} from 'ng2-currency-mask';

@NgModule({
  declarations: [
    AppComponent,
    InvoiceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    PanelModule,
    HttpClientModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    DropdownModule,
    CurrencyMaskModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
