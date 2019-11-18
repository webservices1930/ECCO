import { TestBed } from '@angular/core/testing';

import { ResenaService } from './resena.service';

describe('ResenaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResenaService = TestBed.get(ResenaService);
    expect(service).toBeTruthy();
  });
});
