import { TestBed } from '@angular/core/testing';

import { SalesResolver } from './sales.resolver';

describe('SalesResolver', () => {
  let resolver: SalesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SalesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
