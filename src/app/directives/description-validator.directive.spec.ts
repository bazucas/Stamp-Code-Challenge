import { DescriptionValidatorDirective } from './description-validator.directive';
import {FormControl} from '@angular/forms';

describe('DescriptionValidatorDirective', () => {
  it('should create an instance', () => {
    const directive = new DescriptionValidatorDirective();
    expect(directive).toBeTruthy();
  });

  it('should validate input', () => {
    const directive = new DescriptionValidatorDirective();
    expect(directive.validate(new FormControl('1a23'))).toEqual({descriptionvalidator: { valid: false }});
    expect(directive.validate(new FormControl('1234a567d89'))).toEqual(null);
  });
});
