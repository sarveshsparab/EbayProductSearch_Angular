import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { emptinessValidator } from '../validators/emptiness.validator';

@Directive({
  selector: '[isNonEmpty]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: IsEmptyDirective, multi: true }
  ]
})

export class IsEmptyDirective implements Validator {

  private validator = emptinessValidator();
  validate(control: AbstractControl): { [key: string]: any } {
    return this.validator(control);
  }

}
