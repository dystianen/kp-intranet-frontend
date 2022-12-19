import { TestBed } from '@angular/core/testing';

import { SoalAssignResolver } from './soal-assign.resolver';

describe('SoalAssignResolver', () => {
  let resolver: SoalAssignResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SoalAssignResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
