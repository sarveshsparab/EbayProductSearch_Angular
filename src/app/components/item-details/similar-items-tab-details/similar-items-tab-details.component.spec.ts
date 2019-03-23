import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarItemsTabDetailsComponent } from './similar-items-tab-details.component';

describe('SimilarItemsTabDetailsComponent', () => {
  let component: SimilarItemsTabDetailsComponent;
  let fixture: ComponentFixture<SimilarItemsTabDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimilarItemsTabDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimilarItemsTabDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
