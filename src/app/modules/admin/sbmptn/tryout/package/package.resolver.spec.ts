import { TestBed } from '@angular/core/testing';

import { PackageResolver } from './package.resolver';

describe('PackageResolver', () => {
  let resolver: PackageResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PackageResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
