import { TestBed } from '@angular/core/testing';

import { LptService } from './lpt.service';

describe('LptService', () => {
  let service: LptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
