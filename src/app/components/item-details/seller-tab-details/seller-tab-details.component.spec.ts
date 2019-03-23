import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerTabDetailsComponent } from './seller-tab-details.component';

describe('SellerTabDetailsComponent', () => {
  let component: SellerTabDetailsComponent;
  let fixture: ComponentFixture<SellerTabDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerTabDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerTabDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
