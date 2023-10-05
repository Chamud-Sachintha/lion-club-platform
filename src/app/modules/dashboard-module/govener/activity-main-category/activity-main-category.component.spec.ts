import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityMainCategoryComponent } from './activity-main-category.component';

describe('ActivityMainCategoryComponent', () => {
  let component: ActivityMainCategoryComponent;
  let fixture: ComponentFixture<ActivityMainCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityMainCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityMainCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
