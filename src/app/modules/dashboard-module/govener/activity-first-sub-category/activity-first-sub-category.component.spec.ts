import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityFirstSubCategoryComponent } from './activity-first-sub-category.component';

describe('ActivityFirstSubCategoryComponent', () => {
  let component: ActivityFirstSubCategoryComponent;
  let fixture: ComponentFixture<ActivityFirstSubCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityFirstSubCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityFirstSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
