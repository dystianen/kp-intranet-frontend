import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMapelComponent } from './list-mapel.component';

describe('ListMapelComponent', () => {
  let component: ListMapelComponent;
  let fixture: ComponentFixture<ListMapelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMapelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMapelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
