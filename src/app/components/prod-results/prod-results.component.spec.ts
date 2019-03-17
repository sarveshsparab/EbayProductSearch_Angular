import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdResultsComponent } from './prod-results.component';

describe('ProdResultsComponent', () => {
  let component: ProdResultsComponent;
  let fixture: ComponentFixture<ProdResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
