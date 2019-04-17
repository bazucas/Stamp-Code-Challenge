import {
  NG_VALIDATORS,
  FormControl,
  ValidatorFn,
  Validator
} from '@angular/forms';
import { Directive } from '@angular/core';
@Directive({
  selector: '[appCodeValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CodeValidatorDirective,
      multi: true
    }
  ]
})
export class CodeValidatorDirective implements Validator {
  constructor() {
    this.validator = CodeValidatorDirective.codeValidator();
  }
  validator: ValidatorFn;

  static codeValidator(): ValidatorFn {
    return (c: FormControl) => {
      const isValid = /^[a-zA-Z0-9]*$/.test(c.value);
      if (isValid) {
        return null;
      } else {
        return {
          codevalidator: {
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
