import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {ShippingContent} from '../components/item-details/shipping-tab-details/ShippingContent';

@Injectable({
  providedIn: 'root'
})
export class ItemDetailsService {
  private itemDetailsDataSub = new Subject();
  itemDetailsDataOb = this.itemDetailsDataSub.asObservable();

  preFetchedItemDetailsData: any;


  constructor() {
  }

  getAllItemDetails() {

    let allItemDetails = {
      'misc_content': {
        'title': this.preFetchedItemDetailsData.title
      },
      'productTab_content': 'products',
      'photosTab_content': 'photos',
      'shippingTab_content': this.generateShippingContent(this.preFetchedItemDetailsData),
      'sellerTab_content': this.generateSellerInformation(this.preFetchedItemDetailsData),
      'similarTab_content': 'similar'
    };

    this.itemDetailsDataSub.next(allItemDetails);
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

  }
}
