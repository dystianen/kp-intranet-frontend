import { TestBed } from '@angular/core/testing';

import { TryoutModuleService } from './tryout-module.service';

describe('TryoutModuleService', () => {
  let service: TryoutModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TryoutModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
