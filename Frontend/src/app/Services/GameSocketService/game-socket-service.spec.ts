import { TestBed } from '@angular/core/testing';

import { GameSocketService } from './game-socket-service';

describe('GameSocketServiceService', () => {
  let service: GameSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
