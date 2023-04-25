import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function monthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const monthValue = control.value;

    if (monthValue === '' || monthValue === null) {
      return null;
    }

    const isInvalidMonth = monthValue <= 0 || monthValue > 12;

    return isInvalidMonth
      ? { invalidMonth: isInvalidMonth, message: 'Must be a valid month' }
      : null;
  };
}
