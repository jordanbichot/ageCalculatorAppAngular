import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-birth-date-form',
  templateUrl: './birth-date-form.component.html',
  styleUrls: ['./birth-date-form.component.scss'],
})
export class BirthDateFormComponent implements OnInit {
  public requiredErrorMessage: string = 'This field is required';
  public dayValue: number = 0;
  public monthValue: number = 0;
  public yearValue: number = 0;
  public yearErrorMessage: string = '';

  public birthDateForm = new FormGroup(
    {
      dayField: new FormControl('', [Validators.required, dayValidator()]),
      monthField: new FormControl('', [Validators.required, monthValidator()]),
      yearField: new FormControl('', [Validators.required, yearValidator()]),
    },
    dateValidator()
  );

  public isFormInvalid: boolean = false;

  ngOnInit(): void {}

  public getErrorMessage(index: number) {
    let error: string;
    index === 0
      ? (error = this.getErrorMessageForDays())
      : index === 1
      ? (error = this.getErrorMessageForMonths())
      : (error = this.getErrorMessageForYears());

    return error;
  }

  private getErrorMessageForDays() {
    let form = this.birthDateForm;
    let dayControl = form.controls.dayField;
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
    let monthControl = this.birthDateForm.controls.monthField;
    let error: string;
    error = monthControl.errors?.['invalidMonth']
      ? monthControl.errors?.['message']
      : monthControl.errors?.['required']
      ? this.requiredErrorMessage
      : '';
    return error;
  }

  private getErrorMessageForYears() {
    let yearControl = this.birthDateForm.controls.yearField;
    let error: string;
    error = yearControl.errors?.['invalidYear']
      ? yearControl.errors?.['message']
      : yearControl.errors?.['required']
      ? this.requiredErrorMessage
      : '';
    return error;
  }

  public updateValidation() {
    let fields = this.birthDateForm.controls;

    let allTouched =
      fields.dayField.touched &&
      fields.monthField.touched &&
      fields.yearField.touched;

    this.isFormInvalid =
      (fields.dayField.touched && fields.dayField.invalid) ||
      (fields.monthField.touched && fields.monthField.invalid) ||
      (fields.yearField.touched && fields.yearField.invalid) ||
      (allTouched && this.birthDateForm.invalid);
  }
}
