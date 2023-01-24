import { TestBed } from '@angular/core/testing';

import { TryoutModuleResolver } from './tryout-module.resolver';

describe('TryoutModuleResolver', () => {
  let resolver: TryoutModuleResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TryoutModuleResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
