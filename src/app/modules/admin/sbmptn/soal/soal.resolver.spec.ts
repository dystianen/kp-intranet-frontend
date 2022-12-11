import { TestBed } from '@angular/core/testing';

import { SoalResolver } from './soal.resolver';

describe('SoalResolver', () => {
  let resolver: SoalResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SoalResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
