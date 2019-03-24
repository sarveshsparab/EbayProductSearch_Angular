import { TestBed } from '@angular/core/testing';

import { PhotosContentService } from './photos-content.service';

describe('PhotosContentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhotosContentService = TestBed.get(PhotosContentService);
    expect(service).toBeTruthy();
  });
});
