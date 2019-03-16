import { ValidatorFn, AbstractControl } from '@angular/forms';

export function zipCodeValidator(): ValidatorFn {
  return (ac: AbstractControl): {[key: string]: any} => {
    const isValid = !/^\d{5}$/.test((ac.value || '').trim());
    return isValid ? {validzip: 'Zip code doesnt contain exact 5 digits'} : null;
  };
}
