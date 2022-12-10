import { TestBed } from '@angular/core/testing';

import { MapelResolver } from './mapel.resolver';

describe('MapelResolver', () => {
  let resolver: MapelResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MapelResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
