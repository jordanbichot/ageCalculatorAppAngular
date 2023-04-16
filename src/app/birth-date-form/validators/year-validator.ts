import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function yearValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value === '') {
      return null;
    }

    const actualYear = new Date().getFullYear();
    let errorMessage = '';

    const inPast = value < actualYear;
    const validYear = Number.parseInt(value) > 0;

    errorMessage = !inPast
      ? 'Must be in the past'
      : !validYear
      ? 'Must be a valid year'
      : '';

    return inPast && validYear
      ? null
      : { invalidYear: true, message: errorMessage };
  };
}
