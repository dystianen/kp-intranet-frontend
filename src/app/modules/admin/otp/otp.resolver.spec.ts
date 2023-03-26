import { TestBed } from '@angular/core/testing';

import { OtpResolver } from './otp.resolver';

describe('OtpResolver', () => {
  let resolver: OtpResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(OtpResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
