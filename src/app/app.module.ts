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
import { PositiveDecimalValidatorDirective } from './directives/positive-decimal-validator.directive';
import { CodeValidatorDirective } from './directives/code-validator.directive';
import { DescriptionValidatorDirective } from './directives/description-validator.directive';
import { DiscountValidatorDirective } from './directives/discount-validator.directive';


@NgModule({
  declarations: [
    AppComponent,
    InvoiceComponent,
    PositiveDecimalValidatorDirective,
    CodeValidatorDirective,
    DescriptionValidatorDirective,
    DiscountValidatorDirective
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
