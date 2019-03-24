import {Component, EventEmitter, Input, NgZone, OnInit, Output} from '@angular/core';
import {ItemDetailsService} from '../../services/item-details.service';
import {ProductContentService} from '../../services/product-content.service';
import {SimilarItemContentService} from '../../services/similar-item-content.service';


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

  productTab_content: any;
  photosTab_content: any;
  shippingTab_content: any;
  sellerTab_content: any;
  similarItemsTab_content: any;

  isItemDetailsFetched = false;
  isProductContentFetched = false;
  isSimilarContentFetched = false;
  isPhotoContentFetched = false;

  constructor(private ids: ItemDetailsService, private zone: NgZone, private pcs: ProductContentService,
              private sics: SimilarItemContentService) {
    this.ids.itemDetailsDataOb.subscribe(data=> {
      this.zone.run(() => {
        this.itemDetailsData = data;
        this.itemName = data['misc_content']['title'];
        this.setShippingContent(data['shippingTab_content']);
        this.setSellerContent(data['sellerTab_content']);
        console.log(data);
        this.isItemDetailsFetched = true;
      });
    });

    this.pcs.resultJsonOb.subscribe(data => {
      this.zone.run(()=>{
        this.setProductContent(data);
        this.isProductContentFetched = true;
      });
    });

    this.sics.resultJsonOb.subscribe(data => {
      this.zone.run(()=>{
        this.setSimilarItemsContent(data);
        this.isSimilarContentFetched = true;
      });
    });
  }

  ngOnInit() {
    this.isItemDetailsFetched = false;
    this.isPhotoContentFetched = true;
    this.isProductContentFetched = false;
    this.isSimilarContentFetched = false;
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
    // FB.ui({
    //   method: 'share',
    //   href: 'https://developers.facebook.com/docs/'
    // }, function(response){});
  }

  private setProductContent(jsonObj) {
    this.productTab_content = jsonObj;
  }

  private setPhotosContent(jsonObj) {
    this.photosTab_content = jsonObj;
  }

  private setShippingContent(jsonObj) {
    this.shippingTab_content = jsonObj;
  }

  private setSellerContent(jsonObj) {
    this.sellerTab_content = jsonObj;
  }

  private setSimilarItemsContent(jsonObj) {
    this.similarItemsTab_content = jsonObj;
  }
}
