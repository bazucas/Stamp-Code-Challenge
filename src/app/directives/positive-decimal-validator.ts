import {
  NG_VALIDATORS,
  FormControl,
  ValidatorFn,
  Validator
} from '@angular/forms';
import { Directive } from '@angular/core';
@Directive({
  selector: '[positivedecimalvalidator][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PositivedecimalValidator,
      multi: true
    }
  ]
})
export class PositivedecimalValidator implements Validator {
  constructor() {
    this.validator = PositivedecimalValidator.positivedecimalValidator();
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
