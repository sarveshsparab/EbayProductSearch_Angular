import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosTabDetailsComponent } from './photos-tab-details.component';

describe('PhotosTabDetailsComponent', () => {
  let component: PhotosTabDetailsComponent;
  let fixture: ComponentFixture<PhotosTabDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotosTabDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosTabDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
