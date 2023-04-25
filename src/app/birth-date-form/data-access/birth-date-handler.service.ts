import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

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

  private isFormInvalid = new BehaviorSubject<boolean>(false);
  public isFormInvalid$ = this.isFormInvalid.asObservable();

  public isFormCompleted: boolean = false;

  public dayCurrentValue = '';
  public monthCurrentValue = '';
  public yearCurrentValue = '';

  public buttonClickEventSubject = new Subject();

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

  public emitButtonEvent() {
    this.buttonClickEventSubject.next('Button Clicked');
  }

  public updateValidity(isFormStatusInvalid: boolean) {
    this.isFormInvalid.next(isFormStatusInvalid);
  }

  public updateValues() {
    const maxDaysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const todayDate = new Date();
    const initialDay = Number.parseInt(this.dayCurrentValue);
    const initialMonth = Number.parseInt(this.monthCurrentValue);
    const initialYear = Number.parseInt(this.yearCurrentValue);

    const endDay = todayDate.getDate();
    const endMonth = todayDate.getMonth() + 1;
    const endYear = todayDate.getFullYear();

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
