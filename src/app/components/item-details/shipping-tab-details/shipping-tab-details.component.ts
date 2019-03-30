import {Component, Input, OnInit} from '@angular/core';
import {ShippingContent} from './ShippingContent';

@Component({
  selector: 'app-shipping-tab-details',
  templateUrl: './shipping-tab-details.component.html',
  styleUrls: ['./shipping-tab-details.component.css']
})
export class ShippingTabDetailsComponent implements OnInit {
  @Input('shippingTab_content') content: ShippingContent;
  errorState: any;
  error_msg: any;

  constructor() {
  }

  ngOnInit() {
    if (this.content.Response_Status == 'Error') {
      this.errorState = true;
      this.error_msg = this.content.Response_Message;
    } else {
      this.errorState = false;
      this.error_msg = '';
    }
  }

}
