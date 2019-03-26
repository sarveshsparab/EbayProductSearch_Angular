import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {ShippingContent} from '../components/item-details/shipping-tab-details/ShippingContent';
import {SellerContent} from '../components/item-details/seller-tab-details/SellerContent';
import {ProductContentService} from './product-content.service';
import {SimilarItemContentService} from './similar-item-content.service';
import {PhotosContentService} from './photos-content.service';
import {WishListContent} from '../components/wish-list/WishListContent';

@Injectable({
  providedIn: 'root'
})
export class ItemDetailsService {
  private itemDetailsDataSub = new Subject();
  itemDetailsDataOb = this.itemDetailsDataSub.asObservable();

  preFetchedItemDetailsData: any;


  constructor(private pcs: ProductContentService, private sics: SimilarItemContentService, private phcs: PhotosContentService) {
  }

  getAllItemDetails() {

    let allItemDetails = {
      'misc_content': {
        'title': this.preFetchedItemDetailsData.title
      },
      'shippingTab_content': this.generateShippingContent(this.preFetchedItemDetailsData),
      'sellerTab_content': this.generateSellerInformation(this.preFetchedItemDetailsData)
    };

    this.itemDetailsDataSub.next(allItemDetails);

    this.pcs.fetchProductDetails(this.preFetchedItemDetailsData.itemId[0]);
    this.sics.fetchSimilarItems(this.preFetchedItemDetailsData.itemId[0]);
    this.phcs.fetchPhotos(this.preFetchedItemDetailsData.title[0]);
  }

  generateShippingContent(jsonObj) {
    let jsonContent = new ShippingContent();
      if (jsonObj.shippingInfo != null) {
        if (jsonObj.shippingInfo[0] != null) {

          // Checking Shipping Cost
          if (jsonObj.shippingInfo[0].shippingServiceCost != null) {
            if(jsonObj.shippingInfo[0].shippingServiceCost[0].__value__ > 0) {
              jsonContent.Shipping_Cost = "$" + jsonObj.shippingInfo[0].shippingServiceCost[0].__value__;
            }else{
              jsonContent.Shipping_Cost = "Free Shipping";
            }

          }

          // Checking Shipping Locations
          if(jsonObj.shippingInfo[0].shipToLocations != null){
            if(jsonObj.shippingInfo[0].shipToLocations[0] != null){
              jsonContent.Shipping_Locations = jsonObj.shippingInfo[0].shipToLocations[0];
            }
          }

          // Checking Handling Time
          if(jsonObj.shippingInfo[0].handlingTime != null){
            if(jsonObj.shippingInfo[0].handlingTime[0] != null){
              if(jsonObj.shippingInfo[0].handlingTime[0] == 1){
                jsonContent.Handling_Time = jsonObj.shippingInfo[0].handlingTime[0] + ' Day';
              } else {
                jsonContent.Handling_Time = jsonObj.shippingInfo[0].handlingTime[0] + ' Days';
              }
            }
          }

          // Checking Expedited Shipping
          if(jsonObj.shippingInfo[0].expeditedShipping != null){
            if(jsonObj.shippingInfo[0].expeditedShipping[0] != null){
              jsonContent.Expedited_Shipping = jsonObj.shippingInfo[0].expeditedShipping[0];
            }
          }

          // Checking One day shipping
          if(jsonObj.shippingInfo[0].oneDayShippingAvailable != null){
            if(jsonObj.shippingInfo[0].oneDayShippingAvailable[0] != null){
              jsonContent.One_Day_Shipping = jsonObj.shippingInfo[0].oneDayShippingAvailable[0];
            }
          }

        }
      }

      // Checking Return Accepted
      if(jsonObj.returnsAccepted != null){
        if(jsonObj.returnsAccepted[0] != null){
          jsonContent.Return_Accepted = jsonObj.returnsAccepted[0];
        }
      }

    return jsonContent;
  }

  generateSellerInformation(jsonObj) {
    let jsonContent = new SellerContent();
    if (jsonObj.sellerInfo != null) {
      if (jsonObj.sellerInfo[0] != null){

        // Checking Feedback Score
        if (jsonObj.sellerInfo[0].feedbackScore != null ){
          if (jsonObj.sellerInfo[0].feedbackScore[0] != null){
            jsonContent.Feedback_Score = jsonObj.sellerInfo[0].feedbackScore[0];
          }
        }

        // Checking Popularity
        if (jsonObj.sellerInfo[0].positiveFeedbackPercent != null ){
          if (jsonObj.sellerInfo[0].positiveFeedbackPercent[0] != null){
            jsonContent.Popularity = jsonObj.sellerInfo[0].positiveFeedbackPercent[0];
          }
        }

        // Checking Feedback Rating Star
        if (jsonObj.sellerInfo[0].feedbackRatingStar != null ){
          if (jsonObj.sellerInfo[0].feedbackRatingStar[0] != null){
            jsonContent.Feedback_Rating_Star = jsonObj.sellerInfo[0].feedbackRatingStar[0];
          }
        }

        // Checking Top Rated
        if (jsonObj.sellerInfo[0].topRatedSeller != null ){
          if (jsonObj.sellerInfo[0].topRatedSeller[0] != null){
            jsonContent.Top_Rated = jsonObj.sellerInfo[0].topRatedSeller[0];
          }
        }

        // Checking Seller User NAme
        if (jsonObj.sellerInfo[0].sellerUserName != null ){
          if (jsonObj.sellerInfo[0].sellerUserName[0] != null){
            jsonContent.Seller_User_Name = jsonObj.sellerInfo[0].sellerUserName[0];
          }
        }

      }
    }

    if (jsonObj.storeInfo != null) {
      if (jsonObj.storeInfo[0] != null) {

        // Checking Store Name
        if (jsonObj.storeInfo[0].storeName != null) {
          if (jsonObj.storeInfo[0].storeName[0] != null) {
            jsonContent.Store_Name = jsonObj.storeInfo[0].storeName[0];
          }
        }

        // Checking Buy Product At
        if (jsonObj.storeInfo[0].storeURL != null) {
          if (jsonObj.storeInfo[0].storeURL[0] != null) {
            jsonContent.Buy_Product_At = jsonObj.storeInfo[0].storeURL[0];
          }
        }

      }
    }

    return jsonContent;
  }

  getAllItemDetailsForWishList(wlObj: WishListContent) {
    let allItemDetails = {
      'misc_content': {
        'title': wlObj.Title
      },
      'shippingTab_content': wlObj.Shipping_Content_Obj,
      'sellerTab_content': wlObj.Seller_Content_Obj
    };

    this.itemDetailsDataSub.next(allItemDetails);

    this.pcs.fetchProductDetails(wlObj.ItemID);
    this.sics.fetchSimilarItems(wlObj.ItemID);
    this.phcs.fetchPhotos(wlObj.Title);
  }
}
