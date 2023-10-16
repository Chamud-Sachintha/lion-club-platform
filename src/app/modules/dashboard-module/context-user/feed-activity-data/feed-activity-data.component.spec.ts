import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedActivityDataComponent } from './feed-activity-data.component';

describe('FeedActivityDataComponent', () => {
  let component: FeedActivityDataComponent;
  let fixture: ComponentFixture<FeedActivityDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedActivityDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedActivityDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
