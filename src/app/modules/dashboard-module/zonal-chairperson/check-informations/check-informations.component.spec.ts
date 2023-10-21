import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInformationsComponent } from './check-informations.component';

describe('CheckInformationsComponent', () => {
  let component: CheckInformationsComponent;
  let fixture: ComponentFixture<CheckInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckInformationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
