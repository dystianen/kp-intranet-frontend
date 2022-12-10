import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBabComponent } from './form-bab.component';

describe('FormBabComponent', () => {
  let component: FormBabComponent;
  let fixture: ComponentFixture<FormBabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormBabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
