import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitySecondSubCategoryComponent } from './activity-second-sub-category.component';

describe('ActivitySecondSubCategoryComponent', () => {
  let component: ActivitySecondSubCategoryComponent;
  let fixture: ComponentFixture<ActivitySecondSubCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitySecondSubCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitySecondSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
