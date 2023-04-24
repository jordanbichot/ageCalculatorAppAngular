import { Component, ViewChild } from '@angular/core';
import { BirthDateHandlerService } from './birth-date-form/data-access/birth-date-handler.service';
import { BirthDateFormComponent } from './birth-date-form/birth-date-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(BirthDateFormComponent)
  birthDateFormComponent!: BirthDateFormComponent;

  constructor(private birthDateHandlerService: BirthDateHandlerService) {}

  public calculateAge() {
    if (this.birthDateHandlerService.isFormValid) {
      this.birthDateHandlerService.updateValues();
    } else {
      this.birthDateFormComponent.touchAll();
      this.birthDateHandlerService.changeDays('- -');
      this.birthDateHandlerService.changeMonths('- -');
      this.birthDateHandlerService.changeYears('- -');
    }
  }
}
