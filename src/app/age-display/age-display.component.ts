import { Component } from '@angular/core';
import { BirthDateHandlerService } from '../birth-date-form/data-access/birth-date-handler.service';

@Component({
  selector: 'app-age-display',
  templateUrl: './age-display.component.html',
  styleUrls: ['./age-display.component.scss'],
})
export class AgeDisplayComponent {
  public daysValue$ = this.birthDateHandlerService.daysValue$;
  public monthsValue$ = this.birthDateHandlerService.monthsValue$;
  public yearsValue$ = this.birthDateHandlerService.yearsValue$;

  constructor(private birthDateHandlerService: BirthDateHandlerService) {}
}
