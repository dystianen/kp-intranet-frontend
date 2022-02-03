import { TestBed } from '@angular/core/testing';

import { InputStockResolver } from './input-stock.resolver';

describe('InputStockResolver', () => {
  let resolver: InputStockResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(InputStockResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
