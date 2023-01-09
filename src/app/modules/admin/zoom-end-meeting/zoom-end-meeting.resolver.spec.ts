import { TestBed } from '@angular/core/testing';

import { ZoomEndMeetingResolver } from './zoom-end-meeting.resolver';

describe('ZoomEndMeetingResolver', () => {
  let resolver: ZoomEndMeetingResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ZoomEndMeetingResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
