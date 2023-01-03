import { TestBed } from '@angular/core/testing';

import { ZoomVbService } from './zoom-vb.service';

describe('ZoomVbService', () => {
  let service: ZoomVbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZoomVbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
