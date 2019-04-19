import { CodeValidatorDirective } from './code-validator.directive';
import {FormControl} from '@angular/forms';

describe('CodeValidatorDirective', () => {
  it('should create an instance', () => {
    const directive = new CodeValidatorDirective();
    expect(directive).toBeTruthy();
  });

  it('should validate input', () => {
    const directive = new CodeValidatorDirective();
    expect(directive.validate(new FormControl('123456---'))).toEqual({codevalidator: { valid: false }});
    expect(directive.validate(new FormControl('123456789'))).toEqual(null);
  });
});
