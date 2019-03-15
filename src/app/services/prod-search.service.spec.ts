import { TestBed } from '@angular/core/testing';

import { ProdSearchService } from './prod-search.service';

describe('ProdSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProdSearchService = TestBed.get(ProdSearchService);
    expect(service).toBeTruthy();
  });
});
