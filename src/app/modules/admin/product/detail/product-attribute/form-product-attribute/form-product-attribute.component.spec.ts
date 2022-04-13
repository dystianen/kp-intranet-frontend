import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProductAttributeComponent } from './form-product-attribute.component';

describe('FormProductAttributeComponent', () => {
  let component: FormProductAttributeComponent;
  let fixture: ComponentFixture<FormProductAttributeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormProductAttributeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormProductAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
