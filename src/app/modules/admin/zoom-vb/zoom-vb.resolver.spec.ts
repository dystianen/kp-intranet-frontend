import { TestBed } from '@angular/core/testing';

import { ZoomVbResolver } from './zoom-vb.resolver';

describe('ZoomVbResolver', () => {
  let resolver: ZoomVbResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ZoomVbResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
