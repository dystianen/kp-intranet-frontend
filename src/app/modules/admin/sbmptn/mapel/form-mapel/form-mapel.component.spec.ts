import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMapelComponent } from './form-mapel.component';

describe('FormMapelComponent', () => {
  let component: FormMapelComponent;
  let fixture: ComponentFixture<FormMapelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMapelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMapelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
