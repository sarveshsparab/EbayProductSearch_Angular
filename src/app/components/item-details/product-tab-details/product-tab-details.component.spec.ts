import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTabDetailsComponent } from './product-tab-details.component';

describe('ProductTabDetailsComponent', () => {
  let component: ProductTabDetailsComponent;
  let fixture: ComponentFixture<ProductTabDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTabDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTabDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
