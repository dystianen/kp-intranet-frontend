import { TestBed } from '@angular/core/testing';

import { SoalCategoryService } from './soal-category.service';

describe('SoalCategoryService', () => {
  let service: SoalCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoalCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
