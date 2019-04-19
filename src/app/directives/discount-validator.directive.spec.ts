import { DiscountValidatorDirective } from './discount-validator.directive';
import {FormControl} from '@angular/forms';

describe('DiscountValidatorDirective', () => {
  it('should create an instance', () => {
    const directive = new DiscountValidatorDirective();
    expect(directive).toBeTruthy();
  });

  it('should validate input', () => {
    const directive = new DiscountValidatorDirective();
    expect(directive.validate(new FormControl('-12.5'))).toEqual({discountvalidator: { valid: false }});
    expect(directive.validate(new FormControl('a12.5'))).toEqual({discountvalidator: { valid: false }});
    expect(directive.validate(new FormControl('12.5'))).toEqual(null);
  });
});
