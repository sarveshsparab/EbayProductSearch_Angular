import { TestBed } from '@angular/core/testing';

import { SimilarItemContentService } from './similar-item-content.service';

describe('SimilarItemContentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SimilarItemContentService = TestBed.get(SimilarItemContentService);
    expect(service).toBeTruthy();
  });
});
