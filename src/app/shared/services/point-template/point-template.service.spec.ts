import { TestBed } from '@angular/core/testing';

import { PointTemplateService } from './point-template.service';

describe('PointTemplateService', () => {
  let service: PointTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PointTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
