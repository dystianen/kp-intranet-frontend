import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckSoalComponent } from './check-soal.component';

describe('CheckSoalComponent', () => {
  let component: CheckSoalComponent;
  let fixture: ComponentFixture<CheckSoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckSoalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckSoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
