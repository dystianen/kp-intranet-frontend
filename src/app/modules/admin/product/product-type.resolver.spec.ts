import { TestBed } from '@angular/core/testing';

import { ProductTypeResolver } from './product-type.resolver';

describe('ProductTypeResolver', () => {
  let resolver: ProductTypeResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ProductTypeResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
