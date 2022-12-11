import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormJawabanComponent } from './form-jawaban.component';

describe('FormJawabanComponent', () => {
  let component: FormJawabanComponent;
  let fixture: ComponentFixture<FormJawabanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormJawabanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormJawabanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
