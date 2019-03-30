import {Component, Input, OnInit} from '@angular/core';
import {SellerContent} from './SellerContent';

@Component({
  selector: 'app-seller-tab-details',
  templateUrl: './seller-tab-details.component.html',
  styleUrls: ['./seller-tab-details.component.css']
})
export class SellerTabDetailsComponent implements OnInit {
  @Input("sellerTab_content") content: SellerContent;
  errorState: any;
  error_msg: any;

  constructor() { }

  ngOnInit() {
    if(this.content.Response_Status == 'Error'){
      this.errorState = true;
      this.error_msg = this.content.Response_Message;
    } else {
      this.errorState = false;
      this.error_msg = '';
    }
  }

}
