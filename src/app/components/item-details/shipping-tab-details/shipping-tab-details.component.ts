import {Component, Input, OnInit} from '@angular/core';
import {ShippingContent} from './ShippingContent';

@Component({
  selector: 'app-shipping-tab-details',
  templateUrl: './shipping-tab-details.component.html',
  styleUrls: ['./shipping-tab-details.component.css']
})
export class ShippingTabDetailsComponent implements OnInit {
  @Input("shippingTab_content") content: ShippingContent;

  constructor() { }

  ngOnInit() {
  }

}
