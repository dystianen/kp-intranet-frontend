import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderOfflineComponent } from './order-offline.component';

describe('OrderOfflineComponent', () => {
  let component: OrderOfflineComponent;
  let fixture: ComponentFixture<OrderOfflineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderOfflineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderOfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
