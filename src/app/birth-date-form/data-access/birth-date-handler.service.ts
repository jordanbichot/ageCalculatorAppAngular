import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BirthDateHandlerService {
  private daysValue = new BehaviorSubject<string>('- -');
  public daysValue$ = this.daysValue.asObservable();
  private monthsValue = new BehaviorSubject<string>('- -');
  public monthsValue$ = this.monthsValue.asObservable();
  private yearsValue = new BehaviorSubject<string>('- -');
  public yearsValue$ = this.yearsValue.asObservable();

  public dayCurrentValue = '';
  public monthCurrentValue = '';
  public yearCurrentValue = '';

  public isFormValid = false;

  constructor() {}

  public changeDays(newDaysValue: string) {
    this.daysValue.next(newDaysValue);
  }
  public changeMonths(newMonthsValue: string) {
    this.monthsValue.next(newMonthsValue);
  }
  public changeYears(newYearsValue: string) {
    this.yearsValue.next(newYearsValue);
  }

  public updateValues() {
    let maxDaysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let todayDate = new Date();
    let initialDay = Number.parseInt(this.dayCurrentValue);
    let initialMonth = Number.parseInt(this.monthCurrentValue);
    let initialYear = Number.parseInt(this.yearCurrentValue);

    let endDay = todayDate.getDate();
    let endMonth = todayDate.getMonth() + 1;
    let endYear = todayDate.getFullYear();

    let yearsDifference = endYear - initialYear;
    let monthsDifference = endMonth - initialMonth;
    let daysDifference = endDay - initialDay;

    if (daysDifference < 0) {
      daysDifference = maxDaysPerMonth[initialMonth - 1] + daysDifference;
      monthsDifference--;
    }

    if (monthsDifference < 0) {
      monthsDifference = 12 + monthsDifference;
      yearsDifference--;
    }

    this.changeDays(daysDifference.toString());
    this.changeMonths(monthsDifference.toString());
    this.changeYears(yearsDifference.toString());
  }
}
