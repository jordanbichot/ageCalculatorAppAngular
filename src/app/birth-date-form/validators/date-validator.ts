import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const dayControl = control.get('dayField');
    const monthControl = control.get('monthField');
    const yearControl = control.get('yearField');
    let maxDaysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let allDirty =
      dayControl?.dirty && monthControl?.dirty && yearControl?.dirty;

    if (!allDirty) {
      return null;
    }

    let invalidDate = false;
    let errorMessage = '';

    if (isLeapYear(yearControl?.value)) maxDaysPerMonth[1] = 29;

    if (
      !DoesMonthValueHasValueDays(
        monthControl?.value,
        dayControl?.value,
        maxDaysPerMonth
      )
    ) {
      invalidDate = true;
      errorMessage = 'Must be a valid date';
    }

    return invalidDate
      ? { invalidDate: invalidDate, message: errorMessage }
      : null;
  };
}

function DoesMonthValueHasValueDays(
  monthValue: number | null,
  valueDay: number | null,
  maxDaysPerMonth: number[]
): boolean {
  if (monthValue === null || valueDay === null) return false;
  return valueDay <= maxDaysPerMonth[monthValue - 1];
}

function isLeapYear(yearValue: number | null): boolean {
  if (yearValue === null) return false;
  if (yearValue % 4 === 0) {
    return yearValue % 100 !== 0 ? true : yearValue % 400 === 0;
  }
  return false;
}
