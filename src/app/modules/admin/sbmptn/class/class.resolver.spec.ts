import { TestBed } from '@angular/core/testing';

import { ClassResolver } from './class.resolver';

describe('ClassResolver', () => {
  let resolver: ClassResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ClassResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
