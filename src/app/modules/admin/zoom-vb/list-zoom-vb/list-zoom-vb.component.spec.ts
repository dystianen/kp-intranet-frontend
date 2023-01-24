import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListZoomVbComponent } from './list-zoom-vb.component';

describe('ListZoomVbComponent', () => {
  let component: ListZoomVbComponent;
  let fixture: ComponentFixture<ListZoomVbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListZoomVbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListZoomVbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
