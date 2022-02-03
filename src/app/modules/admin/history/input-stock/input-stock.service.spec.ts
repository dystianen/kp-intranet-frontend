import { TestBed } from '@angular/core/testing';

import { InputStockService } from './input-stock.service';

describe('InputStockService', () => {
  let service: InputStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
