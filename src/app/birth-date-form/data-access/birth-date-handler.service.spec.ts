import { TestBed } from '@angular/core/testing';

import { BirthDateHandlerService } from './birth-date-handler.service';

describe('BirthDateHandlerService', () => {
  let service: BirthDateHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BirthDateHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
