import { TestBed } from '@angular/core/testing';

import { ProofDocumentsService } from './proof-documents.service';

describe('ProofDocumentsService', () => {
  let service: ProofDocumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProofDocumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
