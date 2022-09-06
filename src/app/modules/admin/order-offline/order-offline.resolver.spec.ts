import { TestBed } from '@angular/core/testing';

import { OrderOfflineResolver } from './order-offline.resolver';

describe('OrderOfflineResolver', () => {
  let resolver: OrderOfflineResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(OrderOfflineResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
