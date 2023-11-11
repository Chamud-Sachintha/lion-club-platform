import { TestBed } from '@angular/core/testing';

import { EveluvatorRouteGuardGuard } from './eveluvator-route-guard.guard';

describe('EveluvatorRouteGuardGuard', () => {
  let guard: EveluvatorRouteGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EveluvatorRouteGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
