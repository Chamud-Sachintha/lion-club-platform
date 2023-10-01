import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubUsersComponent } from './club-users.component';

describe('ClubUsersComponent', () => {
  let component: ClubUsersComponent;
  let fixture: ComponentFixture<ClubUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
