import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BullWorkerComponent } from './bull-worker.component';

describe('BullWorkerComponent', () => {
  let component: BullWorkerComponent;
  let fixture: ComponentFixture<BullWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BullWorkerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BullWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
