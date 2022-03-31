import { TestBed } from '@angular/core/testing';

import { ProductGalleryResolver } from './product-gallery.resolver';

describe('ProductGalleryResolver', () => {
  let resolver: ProductGalleryResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ProductGalleryResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
