import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoalAssignComponent } from './soal-assign.component';

describe('SoalAssignComponent', () => {
  let component: SoalAssignComponent;
  let fixture: ComponentFixture<SoalAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoalAssignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoalAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
