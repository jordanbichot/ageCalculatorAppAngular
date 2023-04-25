import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { dayValidator } from './validators/day-validator';
import { monthValidator } from './validators/month-validator';
import { yearValidator } from './validators/year-validator';
import { dateValidator } from './validators/date-validator';
import { BirthDateHandlerService } from './data-access/birth-date-handler.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-birth-date-form',
  templateUrl: './birth-date-form.component.html',
  styleUrls: ['./birth-date-form.component.scss'],
})
export class BirthDateFormComponent implements OnInit, OnDestroy {
  private buttonClickSubscription = new Subscription();
  public requiredErrorMessage: string = 'This field is required';
  public birthDateForm = new FormGroup(
    {
      dayField: new FormControl('', [Validators.required, dayValidator()]),
      monthField: new FormControl('', [Validators.required, monthValidator()]),
      yearField: new FormControl('', [Validators.required, yearValidator()]),
    },
    dateValidator()
  );
  public isFormInvalid = this.birthDateHandlerService.isFormInvalid$;
  private currentIsFormInvalid: boolean = false;

  constructor(private birthDateHandlerService: BirthDateHandlerService) {}

  ngOnInit(): void {
    this.buttonClickSubscription =
      this.birthDateHandlerService.buttonClickEventSubject.subscribe(
        (event) => {
          this.touchAll();
        }
      );
  }

  ngOnDestroy(): void {
    this.buttonClickSubscription.unsubscribe();
  }

  public getErrorMessage(field: string) {
    let error: string;
    field === 'days'
      ? (error = this.getErrorMessageForDays())
      : field === 'months'
      ? (error = this.getErrorMessageForMonths())
      : (error = this.getErrorMessageForYears());

    return error;
  }

  private getErrorMessageForDays() {
    const form = this.birthDateForm;
    const dayControl = form.controls.dayField;
    let error: string;
    error = dayControl.errors?.['invalidDay']
      ? dayControl.errors?.['message']
      : dayControl.errors?.['required']
      ? this.requiredErrorMessage
      : form.errors?.['invalidDate']
      ? form.errors?.['message']
      : '';
    return error;
  }
  private getErrorMessageForMonths() {
    const monthControl = this.birthDateForm.controls.monthField;
    let error: string;
    error = monthControl.errors?.['invalidMonth']
      ? monthControl.errors?.['message']
      : monthControl.errors?.['required']
      ? this.requiredErrorMessage
      : '';
    return error;
  }
  private getErrorMessageForYears() {
    const yearControl = this.birthDateForm.controls.yearField;
    let error: string;
    error = yearControl.errors?.['invalidYear']
      ? yearControl.errors?.['message']
      : yearControl.errors?.['required']
      ? this.requiredErrorMessage
      : '';
    return error;
  }

  public updateValidation() {
    if (this.isFormValid() && this.isAllFieldsDirty()) {
      this.birthDateHandlerService.dayCurrentValue =
        this.birthDateForm.controls.dayField.value!;
      this.birthDateHandlerService.monthCurrentValue =
        this.birthDateForm.controls.monthField.value!;
      this.birthDateHandlerService.yearCurrentValue =
        this.birthDateForm.controls.yearField.value!;

      this.birthDateHandlerService.isFormCompleted = true;
    } else {
      this.birthDateHandlerService.isFormCompleted = false;
    }
  }

  private touchAll() {
    this.birthDateForm.markAllAsTouched();
    this.updateValidation();
  }

  private isAllFieldsDirty() {
    return (
      this.birthDateForm.controls.dayField.dirty &&
      this.birthDateForm.controls.monthField.dirty &&
      this.birthDateForm.controls.yearField.dirty
    );
  }

  private isFormValid() {
    const days = this.birthDateForm.controls.dayField;
    const months = this.birthDateForm.controls.monthField;
    const years = this.birthDateForm.controls.yearField;

    const isAllFieldsTouched = days.touched && months.touched && years.touched;

    const isFormInvalid =
      (days.touched && days.invalid) ||
      (months.touched && months.invalid) ||
      (years.touched && years.invalid) ||
      (isAllFieldsTouched && this.birthDateForm.invalid);

    if (isFormInvalid !== this.currentIsFormInvalid) {
      this.currentIsFormInvalid = isFormInvalid;
      this.birthDateHandlerService.updateValidity(isFormInvalid);
    }

    return !isFormInvalid;
  }
}
