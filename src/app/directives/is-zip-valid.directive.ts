import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { zipCodeValidator } from '../validators/zipCodeValidator';

@Directive({
  selector: '[isValidZip]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: IsZipValidDirective, multi: true }
  ]
})
export class IsZipValidDirective implements Validator {

  private validator = zipCodeValidator();
  validate(control: AbstractControl): { [key: string]: any } {
    return this.validator(control);
  }

}
