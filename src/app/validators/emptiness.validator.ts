import { ValidatorFn, AbstractControl } from '@angular/forms';

export function emptinessValidator(): ValidatorFn {
  return (ac: AbstractControl): {[key: string]: any} => {
    const isEmpty = (ac.value || '').trim().length === 0;
    return isEmpty ? {whitespace: 'Only whitespaces present'} : null;
  };
}
