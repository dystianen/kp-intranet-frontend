import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInputStockComponent } from './list-input-stock.component';

describe('ListInputStockComponent', () => {
  let component: ListInputStockComponent;
  let fixture: ComponentFixture<ListInputStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListInputStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInputStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
