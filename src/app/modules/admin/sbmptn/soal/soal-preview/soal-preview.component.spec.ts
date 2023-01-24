import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoalPreviewComponent } from './soal-preview.component';

describe('SoalPreviewComponent', () => {
  let component: SoalPreviewComponent;
  let fixture: ComponentFixture<SoalPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoalPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoalPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
