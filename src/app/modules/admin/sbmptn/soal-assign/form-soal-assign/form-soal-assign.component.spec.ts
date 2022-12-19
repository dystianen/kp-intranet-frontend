import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSoalAssignComponent } from './form-soal-assign.component';

describe('FormSoalAssignComponent', () => {
  let component: FormSoalAssignComponent;
  let fixture: ComponentFixture<FormSoalAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSoalAssignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSoalAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
