import {
  NG_VALIDATORS,
  FormControl,
  ValidatorFn,
  Validator
} from '@angular/forms';
import { Directive } from '@angular/core';
@Directive({
  selector: '[appPositiveDecimalValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PositiveDecimalValidatorDirective,
      multi: true
    }
  ]
})
export class PositiveDecimalValidatorDirective implements Validator {
  constructor() {
    this.validator = PositiveDecimalValidatorDirective.positivedecimalValidator();
  }
  validator: ValidatorFn;

  static positivedecimalValidator(): ValidatorFn {
    return (c: FormControl) => {
      const isValid = c.value === '' ? true : /^[€]?\d+([.]\d+)?$/.test(c.value);
      if (isValid) {
        return null;
      } else {
        return {
          positivedecimalvalidator: {
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
