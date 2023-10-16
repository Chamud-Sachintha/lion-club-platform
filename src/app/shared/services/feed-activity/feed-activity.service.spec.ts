import { TestBed } from '@angular/core/testing';

import { FeedActivityService } from './feed-activity.service';

describe('FeedActivityService', () => {
  let service: FeedActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
