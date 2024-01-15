import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EveluvationLogComponent } from './eveluvation-log.component';

describe('EveluvationLogComponent', () => {
  let component: EveluvationLogComponent;
  let fixture: ComponentFixture<EveluvationLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EveluvationLogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EveluvationLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
