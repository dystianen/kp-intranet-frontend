import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTelesalesCodeComponent } from './list-telesales-code.component';

describe('ListTelesalesCodeComponent', () => {
  let component: ListTelesalesCodeComponent;
  let fixture: ComponentFixture<ListTelesalesCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTelesalesCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTelesalesCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
