import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-shipping-tab-details',
  templateUrl: './shipping-tab-details.component.html',
  styleUrls: ['./shipping-tab-details.component.css']
})
export class ShippingTabDetailsComponent implements OnInit {
  @Input("shippingTab_content") selectedItem: any;

  constructor() { }

  ngOnInit() {
  }

}
