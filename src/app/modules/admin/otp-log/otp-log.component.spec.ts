import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpLogComponent } from './otp-log.component';

describe('OtpLogComponent', () => {
  let component: OtpLogComponent;
  let fixture: ComponentFixture<OtpLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
