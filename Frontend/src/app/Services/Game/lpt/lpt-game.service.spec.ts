import { TestBed } from '@angular/core/testing';

import { LptGameService } from './lpt-game.service';

describe('LptGameService', () => {
  let service: LptGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LptGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
