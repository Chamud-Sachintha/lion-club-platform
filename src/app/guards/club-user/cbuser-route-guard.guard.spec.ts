import { TestBed } from '@angular/core/testing';

import { CbuserRouteGuardGuard } from './cbuser-route-guard.guard';

describe('CbuserRouteGuardGuard', () => {
  let guard: CbuserRouteGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CbuserRouteGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
