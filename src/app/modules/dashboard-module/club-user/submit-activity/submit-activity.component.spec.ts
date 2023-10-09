import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitActivityComponent } from './submit-activity.component';

describe('SubmitActivityComponent', () => {
  let component: SubmitActivityComponent;
  let fixture: ComponentFixture<SubmitActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
