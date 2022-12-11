import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSoalComponent } from './form-soal.component';

describe('FormSoalComponent', () => {
  let component: FormSoalComponent;
  let fixture: ComponentFixture<FormSoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSoalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
