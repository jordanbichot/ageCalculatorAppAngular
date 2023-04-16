import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function monthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value === '') {
      return null;
    }

    return value > 0 && value <= 12
      ? null
      : { invalidMonth: true, message: 'Must be a valid month' };
  };
}
