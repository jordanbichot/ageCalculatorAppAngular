import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgeDisplayComponent } from './age-display.component';

@NgModule({
  declarations: [AgeDisplayComponent],
  imports: [CommonModule],
  exports: [AgeDisplayComponent],
})
export class AgeDisplayModule {}
