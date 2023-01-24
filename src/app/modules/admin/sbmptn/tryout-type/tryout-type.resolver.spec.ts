import { TestBed } from '@angular/core/testing';

import { TryoutTypeResolver } from './tryout-type.resolver';

describe('TryoutTypeResolver', () => {
  let resolver: TryoutTypeResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TryoutTypeResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
