import { TestBed } from '@angular/core/testing';

import { ResetUjianService } from './reset-ujian.service';

describe('ResetUjianService', () => {
  let service: ResetUjianService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResetUjianService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
