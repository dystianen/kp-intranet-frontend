import { TestBed } from '@angular/core/testing';

import { ScheduleResolver } from './schedule.resolver';

describe('ScheduleResolver', () => {
  let resolver: ScheduleResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ScheduleResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
