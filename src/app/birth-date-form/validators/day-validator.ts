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
    let invalidDay = false;
    let errorMessage = '';

    if (dayValue > 31 || dayValue <= 0) {
      invalidDay = true;
      errorMessage = 'Must be a valid day';
    }

    return invalidDay
      ? {
          invalidDay: invalidDay,
          message: errorMessage,
        }
      : null;
  };
}
