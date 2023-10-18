import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageClubActivitiesComponent } from './manage-club-activities.component';

describe('ManageClubActivitiesComponent', () => {
  let component: ManageClubActivitiesComponent;
  let fixture: ComponentFixture<ManageClubActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageClubActivitiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageClubActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
