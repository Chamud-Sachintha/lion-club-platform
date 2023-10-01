import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextUsersComponent } from './context-users.component';

describe('ContextUsersComponent', () => {
  let component: ContextUsersComponent;
  let fixture: ComponentFixture<ContextUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContextUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContextUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
