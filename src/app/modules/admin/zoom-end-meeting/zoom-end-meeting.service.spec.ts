import { TestBed } from '@angular/core/testing';

import { ZoomEndMeetingService } from './zoom-end-meeting.service';

describe('ZoomEndMeetingService', () => {
  let service: ZoomEndMeetingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZoomEndMeetingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
