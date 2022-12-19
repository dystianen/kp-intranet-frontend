import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoalCategoryComponent } from './soal-category.component';

describe('SoalCategoryComponent', () => {
  let component: SoalCategoryComponent;
  let fixture: ComponentFixture<SoalCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoalCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoalCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
