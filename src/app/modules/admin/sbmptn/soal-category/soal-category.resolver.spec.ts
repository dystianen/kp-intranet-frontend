import { TestBed } from '@angular/core/testing';

import { SoalCategoryResolver } from './soal-category.resolver';

describe('SoalCategoryResolver', () => {
  let resolver: SoalCategoryResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SoalCategoryResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
