import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelesalesCodeComponent } from './telesales-code.component';

describe('TelesalesCodeComponent', () => {
  let component: TelesalesCodeComponent;
  let fixture: ComponentFixture<TelesalesCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelesalesCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelesalesCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
