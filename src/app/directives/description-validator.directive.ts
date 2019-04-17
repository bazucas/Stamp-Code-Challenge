import {
  NG_VALIDATORS,
  FormControl,
  ValidatorFn,
  Validator
} from '@angular/forms';
import { Directive } from '@angular/core';
@Directive({
  selector: '[appDescriptionValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: DescriptionValidatorDirective,
      multi: true
    }
  ]
})
export class DescriptionValidatorDirective implements Validator {
  constructor() {
    this.validator = DescriptionValidatorDirective.descriptionValidator();
  }
  validator: ValidatorFn;

  static descriptionValidator(): ValidatorFn {
    return (c: FormControl) => {
      const isValid = c.value === null ? false : c.value.replace(/\s/g, '').length === 0 || c.value.replace(/\s/g, '').length > 4;
      if (isValid) {
        return null;
      } else {
        return {
          descriptionvalidator: {
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
