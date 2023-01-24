import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTelesalesCodeComponent } from './form-telesales-code.component';

describe('FormTelesalesCodeComponent', () => {
  let component: FormTelesalesCodeComponent;
  let fixture: ComponentFixture<FormTelesalesCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTelesalesCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTelesalesCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
