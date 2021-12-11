import { TestBed } from '@angular/core/testing';

import { CourierResolver } from './courier.resolver';

describe('CourierResolver', () => {
  let resolver: CourierResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CourierResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
