import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { dayValidator } from './validators/day-validator';
import { monthValidator } from './validators/month-validator';
import { yearValidator } from './validators/year-validator';

@Component({
  selector: 'app-birth-date-form',
  templateUrl: './birth-date-form.component.html',
  styleUrls: ['./birth-date-form.component.scss'],
})
export class BirthDateFormComponent implements OnInit {
  public requiredErrorMessage: string = 'This field is required';
  public yearValue: number = 0;
  public yearErrorMessage: string = '';

  public birthDateForm = new FormGroup({
    dayField: new FormControl('', Validators.required),
    monthField: new FormControl('', Validators.required),
    yearField: new FormControl('', Validators.required),
  });
  public isFormInvalid: boolean = false;

  ngOnInit(): void {
    this.birthDateForm.controls.dayField.addValidators(
      dayValidator(
        this.birthDateForm.controls.monthField,
        this.birthDateForm.controls.yearField
      )
    );
    this.birthDateForm.controls.monthField.addValidators(monthValidator());
    this.birthDateForm.controls.yearField.addValidators(yearValidator());
  }

  public getErrorMessage(index: number) {
    let allControls = this.birthDateForm.controls;
    let error: ValidationErrors | null;
    index === 0
      ? (error = allControls.dayField.errors)
      : index === 1
      ? (error = allControls.monthField.errors)
      : (error = allControls.yearField.errors);

    return error?.['required']
      ? this.requiredErrorMessage
      : error?.['invalidYear'] ||
        error?.['invalidMonth'] ||
        error?.['invalidDay'] ||
        error?.['invalidDate']
      ? error?.['message']
      : '';
  }

  public updateValidation() {
    this.isFormInvalid =
      (this.birthDateForm.controls.dayField.touched &&
        this.birthDateForm.controls.dayField.invalid) ||
      (this.birthDateForm.controls.monthField.touched &&
        this.birthDateForm.controls.monthField.invalid) ||
      (this.birthDateForm.controls.yearField.touched &&
        this.birthDateForm.controls.yearField.invalid);
    this.birthDateForm.controls.dayField.updateValueAndValidity();
    console.log(this.isFormInvalid);
  }
}
