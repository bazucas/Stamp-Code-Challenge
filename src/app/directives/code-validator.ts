import {
  NG_VALIDATORS,
  FormControl,
  ValidatorFn,
  Validator
} from '@angular/forms';
import { Directive } from '@angular/core';
@Directive({
  selector: '[codevalidator][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CodeValidator,
      multi: true
    }
  ]
})
export class CodeValidator implements Validator {
  constructor() {
    this.validator = CodeValidator.codeValidator();
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
