import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListJawabanComponent } from './list-jawaban.component';

describe('ListJawabanComponent', () => {
  let component: ListJawabanComponent;
  let fixture: ComponentFixture<ListJawabanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListJawabanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListJawabanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
