import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function dayValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const dayValue = control.value;

    if (dayValue === '' || dayValue === null) {
      return null;
    }
    const isInvalidDay = dayValue > 31 || dayValue <= 0;

    return isInvalidDay
      ? {
          invalidDay: isInvalidDay,
          message: 'Must be a valid day',
        }
      : null;
  };
}
