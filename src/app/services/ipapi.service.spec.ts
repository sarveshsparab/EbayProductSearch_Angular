import { TestBed } from '@angular/core/testing';

import { IPAPIService } from './ipapi.service';

describe('IPAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IPAPIService = TestBed.get(IPAPIService);
    expect(service).toBeTruthy();
  });
});
