import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitNewActivityComponent } from './submit-new-activity.component';

describe('SubmitNewActivityComponent', () => {
  let component: SubmitNewActivityComponent;
  let fixture: ComponentFixture<SubmitNewActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitNewActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitNewActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
