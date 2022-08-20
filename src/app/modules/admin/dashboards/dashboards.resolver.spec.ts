import { TestBed } from '@angular/core/testing';

import { DashboardsResolver } from './dashboards.resolver';

describe('DashboardsResolver', () => {
  let resolver: DashboardsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DashboardsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
