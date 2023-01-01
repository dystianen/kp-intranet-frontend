import { TestBed } from '@angular/core/testing';

import { TryoutTypeService } from './tryout-type.service';

describe('TryoutTypeService', () => {
  let service: TryoutTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TryoutTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
