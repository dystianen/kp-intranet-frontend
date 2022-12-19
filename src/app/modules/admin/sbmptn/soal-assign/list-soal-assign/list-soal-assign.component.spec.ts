import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSoalAssignComponent } from './list-soal-assign.component';

describe('ListSoalAssignComponent', () => {
  let component: ListSoalAssignComponent;
  let fixture: ComponentFixture<ListSoalAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSoalAssignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSoalAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
