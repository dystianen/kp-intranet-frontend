import { TestBed } from '@angular/core/testing';

import { BabResolver } from './bab.resolver';

describe('BabResolver', () => {
  let resolver: BabResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BabResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
