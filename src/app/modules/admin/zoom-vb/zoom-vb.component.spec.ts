import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomVbComponent } from './zoom-vb.component';

describe('ZoomVbComponent', () => {
  let component: ZoomVbComponent;
  let fixture: ComponentFixture<ZoomVbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoomVbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomVbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
