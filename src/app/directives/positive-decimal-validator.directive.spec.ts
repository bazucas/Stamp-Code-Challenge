import { PositiveDecimalValidatorDirective } from './positive-decimal-validator.directive';
import {FormControl} from '@angular/forms';

describe('PositiveDecimalValidatorDirective', () => {
  it('should create an instance', () => {
    const directive = new PositiveDecimalValidatorDirective();
    expect(directive).toBeTruthy();
  });

  it('should validate input', () => {
    const directive = new PositiveDecimalValidatorDirective();
    expect(directive.validate(new FormControl('-12.5'))).toEqual({positivedecimalvalidator: { valid: false }});
    expect(directive.validate(new FormControl('12.5a'))).toEqual({positivedecimalvalidator: { valid: false }});
    expect(directive.validate(new FormControl('12.5'))).toEqual(null);
  });
});
