import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ItemDetailsService} from '../../services/item-details.service';


@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  private itemDetailsTabs = [
    { id: "productTab_itemDetails", title: "Product" },
    { id: "photosTab_itemDetails", title: "Photos" },
    { id: "shippingTab_itemDetails", title: "Shipping" },
    { id: "sellerTab_itemDetails", title: "Seller" },
    { id: "similarTab_itemDetails", title: "Similar Products" }
  ];

  @Output() slide = new EventEmitter<string>();

  private activeTab = "productTab_itemDetails";
  itemDetailsData: any;
  itemName: any;


  constructor(private ids: ItemDetailsService) {
    this.ids.itemDetailsDataOb.subscribe(data=> {
      this.itemDetailsData = data;
      this.itemName = data['title'][0];
      console.log("888888888888888888888888888888888888888888888888");
      console.log(data);
    });
  }

  ngOnInit() {
  }

  setActiveTab(id) {
    this.activeTab = id;
  }

  backToListings() {
    this.slide.emit("right");
  }

  toggleWishList() {

  }

  shareOnFB() {

  }
}
