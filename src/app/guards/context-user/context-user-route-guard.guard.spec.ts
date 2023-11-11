import { TestBed } from '@angular/core/testing';

import { ContextUserRouteGuardGuard } from './context-user-route-guard.guard';

describe('ContextUserRouteGuardGuard', () => {
  let guard: ContextUserRouteGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ContextUserRouteGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
