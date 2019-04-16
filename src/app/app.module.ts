import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PanelModule} from 'primeng/panel';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {DropdownModule, InputTextModule} from 'primeng/primeng';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {CurrencyMaskModule} from 'ng2-currency-mask';

import { AppComponent } from './app.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import {CodeValidator} from './directives/code-validator';
import {DescriptionValidator} from './directives/description-validator';
import {DiscountValidator} from './directives/discount-validator';
import {PositivedecimalValidator} from './directives/positive-decimal-validator';


@NgModule({
  declarations: [
    AppComponent,
    InvoiceComponent,
    CodeValidator,
    DescriptionValidator,
    DiscountValidator,
    PositivedecimalValidator
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
