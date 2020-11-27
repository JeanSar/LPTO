import { TestBed } from '@angular/core/testing';

import { LabiryntheGameService } from './labirynthe-game.service';

describe('LabiryntheGameService', () => {
  let service: LabiryntheGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabiryntheGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});