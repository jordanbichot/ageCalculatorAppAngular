import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthDateFormComponent } from './birth-date-form.component';

describe('BirthDateFormComponent', () => {
  let component: BirthDateFormComponent;
  let fixture: ComponentFixture<BirthDateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BirthDateFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BirthDateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
