import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomEndMeetingComponent } from './zoom-end-meeting.component';

describe('ZoomEndMeetingComponent', () => {
  let component: ZoomEndMeetingComponent;
  let fixture: ComponentFixture<ZoomEndMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoomEndMeetingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomEndMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
