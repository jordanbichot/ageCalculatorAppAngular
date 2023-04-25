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
    const maxDaysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    const isAllDirty =
      dayControl?.dirty && monthControl?.dirty && yearControl?.dirty;

    if (!isAllDirty) {
      return null;
    }

    if (isLeapYear(yearControl?.value)) maxDaysPerMonth[1] = 29;

    const isInvalidDate = !DoesMonthValueHasValueDays(
      monthControl?.value,
      dayControl?.value,
      maxDaysPerMonth
    );

    return isInvalidDate
      ? { invalidDate: isInvalidDate, message: 'Must be a valid date' }
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
