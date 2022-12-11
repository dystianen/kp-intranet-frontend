import { TestBed } from '@angular/core/testing';

import { SoalService } from './soal.service';

describe('SoalService', () => {
  let service: SoalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
