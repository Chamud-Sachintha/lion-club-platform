import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointTablesComponent } from './point-tables.component';

describe('PointTablesComponent', () => {
  let component: PointTablesComponent;
  let fixture: ComponentFixture<PointTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointTablesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
