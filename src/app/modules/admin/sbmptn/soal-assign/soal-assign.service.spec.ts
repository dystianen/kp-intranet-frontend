import { TestBed } from '@angular/core/testing';

import { SoalAssignService } from './soal-assign.service';

describe('SoalAssignService', () => {
  let service: SoalAssignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoalAssignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
