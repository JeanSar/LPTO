import { TestBed } from '@angular/core/testing';

import { LobbyGameService } from './lobby-game.service';

describe('LobbyGameService', () => {
  let service: LobbyGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LobbyGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
