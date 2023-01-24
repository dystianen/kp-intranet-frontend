import { TestBed } from '@angular/core/testing';

import { TelesalesCodeResolver } from './telesales-code.resolver';

describe('TelesalesCodeResolver', () => {
  let resolver: TelesalesCodeResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TelesalesCodeResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
