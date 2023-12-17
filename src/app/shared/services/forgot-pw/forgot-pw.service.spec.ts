import { TestBed } from '@angular/core/testing';

import { ForgotPwService } from './forgot-pw.service';

describe('ForgotPwService', () => {
  let service: ForgotPwService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgotPwService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
