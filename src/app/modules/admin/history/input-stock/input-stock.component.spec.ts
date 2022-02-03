import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputStockComponent } from './input-stock.component';

describe('InputStockComponent', () => {
  let component: InputStockComponent;
  let fixture: ComponentFixture<InputStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
