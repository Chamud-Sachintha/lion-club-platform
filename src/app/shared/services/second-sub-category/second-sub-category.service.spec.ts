import { TestBed } from '@angular/core/testing';

import { SecondSubCategoryService } from './second-sub-category.service';

describe('SecondSubCategoryService', () => {
  let service: SecondSubCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecondSubCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
