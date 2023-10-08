import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProofDocumentsComponent } from './proof-documents.component';

describe('ProofDocumentsComponent', () => {
  let component: ProofDocumentsComponent;
  let fixture: ComponentFixture<ProofDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProofDocumentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProofDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
