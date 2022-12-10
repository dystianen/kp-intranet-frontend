import { TestBed } from '@angular/core/testing';

import { MapelService } from './mapel.service';

describe('MapelService', () => {
  let service: MapelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
