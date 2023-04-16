import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BirthDateFormModule } from './birth-date-form/birth-date-form.module';
import { AgeDisplayComponent } from './age-display/age-display.component';
import { AgeDisplayModule } from './age-display/age-display.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BirthDateFormModule, AgeDisplayModule, BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
