import { TestBed } from '@angular/core/testing';

import { BabService } from './bab.service';

describe('BabService', () => {
  let service: BabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
