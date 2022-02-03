import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInputStockHistoryComponent } from './list-input-stock-history.component';

describe('ListInputStockHistoryComponent', () => {
  let component: ListInputStockHistoryComponent;
  let fixture: ComponentFixture<ListInputStockHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListInputStockHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInputStockHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
