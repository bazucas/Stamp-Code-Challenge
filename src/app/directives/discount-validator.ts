import {
  NG_VALIDATORS,
  FormControl,
  ValidatorFn,
  Validator
} from '@angular/forms';
import { Directive } from '@angular/core';
@Directive({
  selector: '[discountvalidator][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: DiscountValidator,
      multi: true
    }
  ]
})
export class DiscountValidator implements Validator {
  constructor() {
    this.validator = DiscountValidator.discountValidator();
  }
  validator: ValidatorFn;

  static discountValidator(): ValidatorFn {
    return (c: FormControl) => {
      const isValid = /^[€]?\d+([.]\d+)?$/.test(c.value);
      if (isValid) {
        return null;
      } else {
        return {
          discountvalidator: {
            valid: false
          }
        };
      }
    };
  }
  validate(c: FormControl) {
    return this.validator(c);
  }
}
