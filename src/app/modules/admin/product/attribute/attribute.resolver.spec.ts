import { TestBed } from '@angular/core/testing';

import { AttributeResolver } from './attribute.resolver';

describe('AttributeResolver', () => {
  let resolver: AttributeResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AttributeResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
