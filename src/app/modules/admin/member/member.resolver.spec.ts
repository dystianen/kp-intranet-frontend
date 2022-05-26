import { TestBed } from '@angular/core/testing';

import { MemberResolver } from './member.resolver';

describe('MemberResolver', () => {
  let resolver: MemberResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MemberResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
