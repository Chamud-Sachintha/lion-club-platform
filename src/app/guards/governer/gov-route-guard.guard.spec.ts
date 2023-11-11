import { TestBed } from '@angular/core/testing';

import { GovRouteGuardGuard } from './gov-route-guard.guard';

describe('GovRouteGuardGuard', () => {
  let guard: GovRouteGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GovRouteGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
