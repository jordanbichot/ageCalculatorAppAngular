import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BirthDateFormComponent } from './birth-date-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BirthDateFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [BirthDateFormComponent],
})
export class BirthDateFormModule {}
