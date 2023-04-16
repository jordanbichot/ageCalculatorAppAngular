import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeDisplayComponent } from './age-display.component';

describe('AgeDisplayComponent', () => {
  let component: AgeDisplayComponent;
  let fixture: ComponentFixture<AgeDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgeDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgeDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
