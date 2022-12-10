import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BabComponent } from './bab.component';

describe('BabComponent', () => {
  let component: BabComponent;
  let fixture: ComponentFixture<BabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
