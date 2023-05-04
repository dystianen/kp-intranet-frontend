import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetUjianComponent } from './reset-ujian.component';

describe('ResetUjianComponent', () => {
  let component: ResetUjianComponent;
  let fixture: ComponentFixture<ResetUjianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetUjianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetUjianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
