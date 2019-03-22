import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ItemDetailsService } from '../../services/item-details.service';
import { WishListService } from '../../services/wish-list.service';
import { ProdSearchService } from '../../services/prod-search.service';

@Component({
  selector: 'app-search-listing',
  templateUrl: './search-listing.component.html',
  styleUrls: ['./search-listing.component.css']
})
export class SearchListingComponent implements OnInit {
  @Output() slide = new EventEmitter<string>();
  @Input("itemId") selectedItem: any;

  selectedItemJsonObj: any;
  displayListings = false;
  resultJson = null;
  nextPage: any;
  prevPage: any = false;
  curPage = 1;
  service: any;
  isFavorite: any;
  errorState: boolean = false;
  error_msg: any;

  constructor(private pss: ProdSearchService, private ids: ItemDetailsService, private wls: WishListService) {
    this.pss.resultJsonOb.subscribe(data => {
      console.log("EbayFindingsApi results");
      console.log(data);
      if (data === null) {
        this.errorState = true;
        this.displayListings = true;
      } else if (data === undefined) {

      }
      else if (data["responseStatus"] == 'Error') {
        this.errorState = true;
        this.error_msg = data["responseContent"];
        this.resultJson = null;
        this.displayListings = true;
      }
      else if(data == 'clear') {
        this.resultJson = null;
        this.displayListings = true;
        this.selectedItem = null;
      }
      else {
        this.resultJson = data["responseContent"];
        //this.checkFavorite();
        this.errorState = false;
        this.displayListings = true;
      }


    });
  }

  highlightRow(itemId) {
    this.selectedItem = itemId;
  }

  // showDetails() {
  //   this.slide.emit({ slide: "left", place: this.selectedItem });
  // }

  // getDetails(placeId) {
  //   this.highlightRow(placeId);
  //   //this.dService.getDetails(placeId, this.startLocation, this.geoJson);
  //   this.slide.emit({ slide: "left", place: placeId });
  // }

  ngOnInit() {
    this.pss.loadFetchedJsonData();
    this.curPage = 1;
  }

  processImage(jsonObj) {
    if(jsonObj.galleryURL !=null && jsonObj.galleryURL != "" && jsonObj.galleryURL.length != 0){
      let imageElem = document.createElement('img');
      imageElem.setAttribute("src", jsonObj.galleryURL[0]);
      return imageElem.outerHTML;
    } else {
      return 'N/A';
    }
  }

  processTitle(jsonObj) {
    if (jsonObj.title == null || jsonObj.title.length == 0) {
      return "N/A";
    } else {
      let titleLen = jsonObj["title"][0].length;
      if (titleLen < 35)
        return jsonObj["title"][0];
      else{
        if(jsonObj["title"][0].substring(0,35).slice(-1) == ''){
          return jsonObj["title"][0].substring(0,35) + "...";
        } else {
          return jsonObj["title"][0].substring(0,jsonObj["title"][0].substring(0,35).lastIndexOf(" ")) + "...";
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
    if(jsonObj.shippingInfo == null || jsonObj.shippingInfo.length == 0) {
      shipStr = 'N/A';
    } else if(jsonObj.shippingInfo[0].shippingServiceCost == null ||
      jsonObj.shippingInfo[0].shippingServiceCost.length == 0) {
      shipStr = 'N/A';
    } else {
      if(jsonObj.shippingInfo[0].shippingServiceCost[0].__value__ > 0) {
        shipStr = '$';
        shipStr += jsonObj.shippingInfo[0].shippingServiceCost[0].__value__;
      }else{
        shipStr = 'Free Shipping';
      }
    }
    return shipStr;
  }

  processZip(jsonObj) {
    if(jsonObj.postalCode !=null && jsonObj.postalCode != "" && jsonObj.postalCode.length != 0){
      return jsonObj.postalCode;
    } else {
      return "N/A";
    }
  }

  processSeller(jsonObj) {
    let sellerStr = '';
    if(jsonObj.sellerInfo == null || jsonObj.sellerInfo.length == 0) {
      sellerStr = 'N/A';
    } else if(jsonObj.sellerInfo[0].sellerUserName == null ||
      jsonObj.sellerInfo[0].sellerUserName.length == 0) {
      sellerStr = 'N/A';
    } else {
      sellerStr = jsonObj.sellerInfo[0].sellerUserName[0];
    }
    return sellerStr;
  }

  processTooltip(jsonObj) {
    if (jsonObj.title == null || jsonObj.title.length == 0) {
      return "N/A";
    } else {
      return jsonObj["title"][0];
    }
  }

  toggleItemInWishList(jsonObj) {
    alert(jsonObj.itemId[0]);
    this.slide.emit(JSON.stringify({ slide: "left", itemId: this.selectedItem }));
  }

  fetchItemDetails(jsonObj){
    this.selectedItem = jsonObj.itemId[0];
    this.selectedItemJsonObj = jsonObj;
    this.getItemDetails();
  }

  getItemDetails() {
    alert("Details for :" + this.selectedItem);
    console.log(this.selectedItemJsonObj);
  }
}
