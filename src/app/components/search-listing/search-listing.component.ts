import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ItemDetailsService} from '../../services/item-details.service';
import {WishListService} from '../../services/wish-list.service';
import {ProdSearchService} from '../../services/prod-search.service';
import {WishListContent} from '../wish-list/WishListContent';

@Component({
  selector: 'app-search-listing',
  templateUrl: './search-listing.component.html',
  styleUrls: ['./search-listing.component.css']
})
export class SearchListingComponent implements OnInit {
  @Output() transmitEvent = new EventEmitter<any>();
  @Input('itemId') selectedItem: any;

  selectedItemJsonObj: any;
  displayListings = false;
  resultJson = null;
  service: any;
  errorState: boolean = false;
  error_msg: any;
  currPage = 1;
  pageSize = 10;
  isAlreadyInWishList: any;
  clearTriggered: boolean;

  constructor(private pss: ProdSearchService, private ids: ItemDetailsService, private wls: WishListService) {
    this.pss.resultJsonOb.subscribe(data => {
      console.log('EbayFindingsApi results');
      console.log(data);
      if (data === null) {
        this.errorState = true;
        this.displayListings = true;
        this.clearTriggered = false;
      } else if (data == undefined) {

      }else if (data['responseStatus'] == 'Error') {
        this.errorState = true;
        this.error_msg = data['responseContent'];
        this.resultJson = null;
        this.displayListings = true;
        this.clearTriggered = false;
      } else if (data['responseStatus'] == 'Clear') {
        this.resultJson = null;
        this.displayListings = true;
        this.selectedItem = null;
        this.clearTriggered = true;
      } else {
        this.resultJson = data['responseContent'];
        this.checkAndUpdateWishList();
        this.errorState = false;
        this.displayListings = true;
        this.clearTriggered = false;
      }
    });
    this.wls.wishListModifiedOb.subscribe(data => {
      this.checkAndUpdateWishList();
    });
  }

  ngOnInit() {
    this.pss.loadFetchedJsonData();
    this.currPage = 1;
  }

  processImage(jsonObj) {
    if (jsonObj.galleryURL != null && jsonObj.galleryURL != '' && jsonObj.galleryURL.length != 0) {
      let imageElem = document.createElement('img');
      imageElem.setAttribute('src', jsonObj.galleryURL[0]);
      imageElem.setAttribute('style', 'height: 135px; width: 135px;');
      return imageElem.outerHTML;
    } else {
      return 'N/A';
    }
  }

  processTitle(jsonObj) {
    if (jsonObj.title == null || jsonObj.title.length == 0) {
      return 'N/A';
    } else {
      let titleLen = jsonObj['title'][0].length;
      if (titleLen < 35) {
        return jsonObj['title'][0];
      } else {
        if (jsonObj['title'][0].substring(0, 35).slice(-1) == ' ') {
          return jsonObj['title'][0].substring(0, 35) + '...';
        } else {
          return jsonObj['title'][0].substring(0, jsonObj['title'][0].substring(0, 35).lastIndexOf(' ')) + '...';
        }
      }
    }
  }

  processPrice(jsonObj) {
    let currStr = '';
    if (jsonObj.sellingStatus == null || jsonObj.sellingStatus.length == 0) {
      currStr = 'N/A';
    } else if (jsonObj.sellingStatus[0].currentPrice == null ||
      jsonObj.sellingStatus[0].currentPrice.length == 0) {
      currStr = 'N/A';
    } else {
      currStr = '$';
      currStr += jsonObj.sellingStatus[0].currentPrice[0].__value__;
    }
    return currStr;
  }

  processShipping(jsonObj) {
    let shipStr = '';
    if (jsonObj.shippingInfo == null || jsonObj.shippingInfo.length == 0) {
      shipStr = 'N/A';
    } else if (jsonObj.shippingInfo[0].shippingServiceCost == null ||
      jsonObj.shippingInfo[0].shippingServiceCost.length == 0) {
      shipStr = 'N/A';
    } else {
      if (jsonObj.shippingInfo[0].shippingServiceCost[0].__value__ > 0) {
        shipStr = '$';
        shipStr += jsonObj.shippingInfo[0].shippingServiceCost[0].__value__;
      } else {
        shipStr = 'Free Shipping';
      }
    }
    return shipStr;
  }

  processZip(jsonObj) {
    if (jsonObj.postalCode != null && jsonObj.postalCode != '' && jsonObj.postalCode.length != 0) {
      return jsonObj.postalCode;
    } else {
      return 'N/A';
    }
  }

  processSeller(jsonObj) {
    let sellerStr = '';
    if (jsonObj.sellerInfo == null || jsonObj.sellerInfo.length == 0) {
      sellerStr = 'N/A';
    } else if (jsonObj.sellerInfo[0].sellerUserName == null ||
      jsonObj.sellerInfo[0].sellerUserName.length == 0) {
      sellerStr = 'N/A';
    } else {
      sellerStr = jsonObj.sellerInfo[0].sellerUserName[0];
    }
    return sellerStr;
  }

  processTooltip(jsonObj) {
    if (jsonObj.title == null || jsonObj.title.length == 0) {
      return 'N/A';
    } else {
      return jsonObj['title'][0];
    }
  }

  toggleItemInWishList(index) {
    let jsonObj = this.resultJson[index];
    if (this.isAlreadyInWishList[index]) {
      let wlObj = new WishListContent();
      wlObj.ItemID = jsonObj.itemId[0];
      this.wls.removeFromWishList(wlObj);
      this.isAlreadyInWishList[index] = false;
    } else {
      let wlObj = new WishListContent();
      wlObj.ItemID = jsonObj.itemId[0];
      wlObj.Title = this.getValidTitle(jsonObj);
      wlObj.Image_URL = this.getValidImageURL(jsonObj);
      wlObj.Price = this.getValidPrice(jsonObj);
      wlObj.Shipping_Option = this.getValidShippingOption(jsonObj);
      wlObj.Seller_Name = this.getValidSellerName(jsonObj);
      wlObj.Seller_Content_Obj = this.getValidSellerContent(jsonObj);
      wlObj.Shipping_Content_Obj = this.getValidShippingContent(jsonObj);
      this.wls.addToWishList(wlObj);
      this.isAlreadyInWishList[index] = true;
    }
  }

  fetchItemDetails(jsonObj) {
    this.selectedItem = jsonObj.itemId[0];
    this.selectedItemJsonObj = jsonObj;
    this.ids.preFetchedItemDetailsData = jsonObj;
    this.getItemDetails();
  }

  getItemDetails() {
    this.ids.getAllItemDetails();
    this.transmitEvent.emit({activeSibling: 'details', itemId: this.selectedItem, itemInfo: this.selectedItemJsonObj});
  }

  private checkAndUpdateWishList() {
    if (this.resultJson) {
      let itemIdArr = this.resultJson.map(data => data.itemId[0]);
      this.isAlreadyInWishList = this.wls.isOnWishList(itemIdArr);
    }
  }

  private getValidTitle(jsonObj: any) {
    if (jsonObj.title == null || jsonObj.title.length == 0) {
      return 'N/A';
    } else {
      return jsonObj['title'][0];
    }
  }

  private getValidImageURL(jsonObj: any) {
    if (jsonObj.galleryURL != null && jsonObj.galleryURL != '' && jsonObj.galleryURL.length != 0) {
      return jsonObj.galleryURL[0];
    } else {
      return 'N/A';
    }
  }

  private getValidPrice(jsonObj: any) {
    return this.processPrice(jsonObj);
  }

  private getValidShippingOption(jsonObj: any) {
    return this.processShipping(jsonObj);
  }

  private getValidSellerName(jsonObj: any) {
    return this.processSeller(jsonObj);
  }

  private getValidSellerContent(jsonObj: any) {
    return this.ids.generateSellerInformation(jsonObj);
  }

  private getValidShippingContent(jsonObj: any) {
    return this.ids.generateShippingContent(jsonObj);
  }
}
