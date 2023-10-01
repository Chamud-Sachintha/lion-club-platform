import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChairpersonsComponent } from './chairpersons.component';

describe('ChairpersonsComponent', () => {
  let component: ChairpersonsComponent;
  let fixture: ComponentFixture<ChairpersonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChairpersonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChairpersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
