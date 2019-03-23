import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-product-tab-details',
  templateUrl: './product-tab-details.component.html',
  styleUrls: ['./product-tab-details.component.css']
})
export class ProductTabDetailsComponent implements OnInit {
  @Input("productTab_content") selectedItem: any;

  constructor() { }

  ngOnInit() {
  }

}
