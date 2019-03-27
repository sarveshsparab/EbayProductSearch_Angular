import {Component, EventEmitter, Input, NgZone, OnInit, Output} from '@angular/core';
import {ItemDetailsService} from '../../services/item-details.service';
import {ProductContentService} from '../../services/product-content.service';
import {SimilarItemContentService} from '../../services/similar-item-content.service';
import {PhotosContentService} from '../../services/photos-content.service';
import {WishListService} from '../../services/wish-list.service';
import {WishListContent} from '../wish-list/WishListContent';


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
  entireItemDetailsData = {};
  entireItemDetailsDataReceived: boolean;

  itemName: any;
  fbShareLink: any;

  productTab_content: any;
  photosTab_content: any;
  shippingTab_content: any;
  sellerTab_content: any;
  similarItemsTab_content: any;

  isItemDetailsFetched = false;
  isProductContentFetched = false;
  isSimilarContentFetched = false;
  isPhotoContentFetched = false;

  isAlreadyInWishList: boolean;

  constructor(private ids: ItemDetailsService, private zone: NgZone, private pcs: ProductContentService,
              private sics: SimilarItemContentService, private phcs: PhotosContentService, private wls: WishListService) {
    this.ids.itemDetailsDataOb.subscribe(data=> {
      this.zone.run(() => {
        this.entireItemDetailsData['ids'] = data;
        this.entireItemDetailsDataReceived = true;
        this.itemName = data['misc_content']['title'];
        this.setShippingContent(data['shippingTab_content']);
        this.setSellerContent(data['sellerTab_content']);
        this.isItemDetailsFetched = true;
        this.isAlreadyInWishList = this.wls.isOnWishList([this.entireItemDetailsData['ids']['misc_content']['itemId']])[0];
      });
    });

    this.pcs.resultJsonOb.subscribe(data => {
      this.zone.run(()=>{
        this.entireItemDetailsData['pcs'] = data;
        this.entireItemDetailsDataReceived = true;
        this.setProductContent(data);
        this.setFBShareLink(data);
        this.isProductContentFetched = true;
      });
    });

    this.sics.resultJsonOb.subscribe(data => {
      this.zone.run(()=>{
        this.entireItemDetailsData['sics'] = data;
        this.entireItemDetailsDataReceived = true;
        this.setSimilarItemsContent(data);
        this.isSimilarContentFetched = true;
      });
    });

    this.phcs.resultJsonOb.subscribe(data => {
      this.zone.run(()=>{
        this.entireItemDetailsData['phcs'] = data;
        this.entireItemDetailsDataReceived = true;
        this.setPhotosContent(data);
        this.isPhotoContentFetched = true;
      });
    });
  }

  ngOnInit() {
    this.isItemDetailsFetched = false;
    this.isPhotoContentFetched = false;
    this.isProductContentFetched = false;
    this.isSimilarContentFetched = false;
    this.entireItemDetailsDataReceived = false;
  }

  setActiveTab(id) {
    this.activeTab = id;
  }

  backToListings() {
    this.slide.emit("right");
  }

  toggleItemInWishList() {
    this.zone.run(() => {
      if (this.isAlreadyInWishList) {
        let wlObj = new WishListContent();
        wlObj.ItemID = this.entireItemDetailsData['ids'].misc_content.itemId;
        this.wls.removeFromWishList(wlObj);
        this.isAlreadyInWishList = false;
      } else {
        let wlObj = new WishListContent();
        wlObj.ItemID = this.entireItemDetailsData['ids'].misc_content.itemId;
        wlObj.Title = this.entireItemDetailsData['ids'].misc_content.title;
        wlObj.Image_URL = this.entireItemDetailsData['ids'].misc_content.imageURL;
        wlObj.Price = this.entireItemDetailsData['pcs'].Price;
        wlObj.Seller_Name = this.entireItemDetailsData['ids'].sellerTab_content.Seller_User_Name;
        wlObj.Shipping_Option = this.entireItemDetailsData['ids'].shippingTab_content.Shipping_Cost;
        wlObj.Seller_Content_Obj = this.entireItemDetailsData['ids'].sellerTab_content;
        wlObj.Shipping_Content_Obj = this.entireItemDetailsData['ids'].shippingTab_content;
        this.wls.addToWishList(wlObj);
        this.isAlreadyInWishList = true;
      }
    });
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

  private setFBShareLink(jsonData) {
    let link ='';

    link += 'https://www.facebook.com/dialog/share?';
    link += 'app_id=' + '437955393676463';
    link += '&display=popup';
    link += '&href=' + encodeURI(jsonData.Link);
    link += '&quote=' + 'Buy ' + jsonData.Title + ' at ' + jsonData.Price + ' from the link below';

    this.fbShareLink = link;
  }
}
