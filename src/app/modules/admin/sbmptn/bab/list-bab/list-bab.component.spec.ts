import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBabComponent } from './list-bab.component';

describe('ListBabComponent', () => {
  let component: ListBabComponent;
  let fixture: ComponentFixture<ListBabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
