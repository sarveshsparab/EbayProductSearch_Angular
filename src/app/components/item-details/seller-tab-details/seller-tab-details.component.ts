import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-seller-tab-details',
  templateUrl: './seller-tab-details.component.html',
  styleUrls: ['./seller-tab-details.component.css']
})
export class SellerTabDetailsComponent implements OnInit {
  @Input("sellerTab_content") selectedItem: any;

  constructor() { }

  ngOnInit() {
  }

}
