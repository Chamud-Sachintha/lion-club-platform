import { TestBed } from '@angular/core/testing';

import { FirstSubCategoryService } from './first-sub-category.service';

describe('FirstSubCategoryService', () => {
  let service: FirstSubCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirstSubCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
