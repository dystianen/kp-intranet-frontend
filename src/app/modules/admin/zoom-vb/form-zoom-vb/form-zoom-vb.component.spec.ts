import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormZoomVbComponent } from './form-zoom-vb.component';

describe('FormZoomVbComponent', () => {
  let component: FormZoomVbComponent;
  let fixture: ComponentFixture<FormZoomVbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormZoomVbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormZoomVbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
