import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingTabDetailsComponent } from './shipping-tab-details.component';

describe('ShippingTabDetailsComponent', () => {
  let component: ShippingTabDetailsComponent;
  let fixture: ComponentFixture<ShippingTabDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingTabDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingTabDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
