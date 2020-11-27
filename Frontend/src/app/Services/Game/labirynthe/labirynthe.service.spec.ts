import { TestBed } from '@angular/core/testing';

import { LabyrintheService } from './labirynthe.service';

describe('LabiryntheService', () => {
  let service: LabyrintheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabyrintheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
