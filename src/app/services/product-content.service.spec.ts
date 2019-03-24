import { TestBed } from '@angular/core/testing';

import { ProductContentService } from './product-content.service';

describe('ProductContentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductContentService = TestBed.get(ProductContentService);
    expect(service).toBeTruthy();
  });
});
