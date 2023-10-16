import { TestBed } from '@angular/core/testing';

import { ClubActivityServiceService } from './club-activity-service.service';

describe('ClubActivityServiceService', () => {
  let service: ClubActivityServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClubActivityServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
