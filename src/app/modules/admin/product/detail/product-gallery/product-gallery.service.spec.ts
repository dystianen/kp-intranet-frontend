import { TestBed } from '@angular/core/testing';

import { ProductGalleryService } from './product-gallery.service';

describe('ProductGalleryService', () => {
  let service: ProductGalleryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductGalleryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
