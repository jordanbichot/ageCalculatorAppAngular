import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function dayValidator(
  monthControl: FormControl | null,
  yearControl: FormControl | null
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    let monthValue = monthControl?.value;
    let yearValue = yearControl?.value;

    if (value === '') {
      return null;
    }
    let invalidDay = false;
    let invalidDate = false;
    let errorMessage = '';

    if (monthValue === '' && yearValue === '') {
      if (value > 31 || value <= 0) {
        invalidDay = true;
        errorMessage = 'Must be a valid day';
      }
    }
    if (monthValue !== '' && yearValue === '') {
      if (!DoesMonthValueHasValueDays(monthValue!, value!)) {
        invalidDay = true;
        errorMessage = 'Must be a valid day';
      }
    }
    if (monthValue !== '' && yearValue !== '') {
      if (!isDateValid(yearValue!, monthValue!, value!)) {
        invalidDate = true;
        errorMessage = 'Must be a valid date';
      }
    }

    return invalidDay || invalidDate
      ? {
          invalidDay: invalidDay,
          invalidDate: invalidDate,
          message: errorMessage,
        }
      : null;
  };
}

function DoesMonthValueHasValueDays(
  monthValue: number,
  valueDay: number
): boolean {
  const maxDaysPerMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return valueDay <= maxDaysPerMonth[monthValue - 1] && valueDay > 0;
}

function isDateValid(
  yearValue: number,
  monthValue: number,
  valueDay: number
): boolean {
  let maxDaysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (isLeapYear(yearValue)) {
    maxDaysPerMonth[1] = 29;
  }

  const validDate = valueDay <= maxDaysPerMonth[monthValue - 1] && valueDay > 0;

  return validDate;
}

function isLeapYear(yearValue: number): boolean {
  if (yearValue % 4 === 0) {
    return yearValue % 100 !== 0 ? true : yearValue % 400 === 0;
  }
  return false;
}
