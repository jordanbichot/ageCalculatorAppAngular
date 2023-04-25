import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function yearValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const yearValue = control.value;

    if (yearValue === '' || yearValue === null) {
      return null;
    }

    const actualYear = new Date().getFullYear();

    const isInPast = yearValue < actualYear;
    const isValidYear = Number.parseInt(yearValue) > 0;

    const errorMessage = !isInPast
      ? 'Must be in the past'
      : !isValidYear
      ? 'Must be a valid year'
      : '';

    return isInPast && isValidYear
      ? null
      : { invalidYear: true, message: errorMessage };
  };
}
