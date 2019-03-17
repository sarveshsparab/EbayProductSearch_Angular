import { TestBed } from '@angular/core/testing';

import { ZipAutoCompleteService } from './zip-auto-complete.service';

describe('ZipAutoCompleteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ZipAutoCompleteService = TestBed.get(ZipAutoCompleteService);
    expect(service).toBeTruthy();
  });
});
