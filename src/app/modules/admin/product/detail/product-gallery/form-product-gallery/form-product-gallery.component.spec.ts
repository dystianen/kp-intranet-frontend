import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProductGalleryComponent } from './form-product-gallery.component';

describe('FormProductGalleryComponent', () => {
  let component: FormProductGalleryComponent;
  let fixture: ComponentFixture<FormProductGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormProductGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormProductGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
