import { TestBed } from '@angular/core/testing';

import { TelesalesCodeService } from './telesales-code.service';

describe('TelesalesCodeService', () => {
  let service: TelesalesCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TelesalesCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
