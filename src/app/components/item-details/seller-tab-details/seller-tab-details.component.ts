import {Component, Input, OnInit} from '@angular/core';
import {SellerContent} from './SellerContent';

@Component({
  selector: 'app-seller-tab-details',
  templateUrl: './seller-tab-details.component.html',
  styleUrls: ['./seller-tab-details.component.css']
})
export class SellerTabDetailsComponent implements OnInit {
  @Input("sellerTab_content") content: SellerContent;

  constructor() { }

  ngOnInit() {
  }

}
