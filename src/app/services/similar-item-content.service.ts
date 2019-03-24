import {Injectable, EventEmitter, Output} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Subject, Observable} from 'rxjs';
import {ProductContent} from '../components/item-details/product-tab-details/ProductContent';
import {SimilarItemContent} from '../components/item-details/similar-items-tab-details/SimilarItemContent';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class SimilarItemContentService {

  private resultJsonSub = new Subject();
  resultJsonOb = this.resultJsonSub.asObservable();
  private jsonDataFetched: any;

  constructor(private http: HttpClient) {
  }

  fetchSimilarItems(itemId) {
    let params = new HttpParams()
      .set('itemid', itemId);

    let response = this.http.get(this.buildEbayUrl(itemId));

    response.subscribe(
      data => {

        console.log(data);

        this.jsonDataFetched = data;
        let responseValidityCheck = this.isFetchedResponseValid(this.jsonDataFetched);
        if (!responseValidityCheck[0]) {
          let simCont = new SimilarItemContent();
          simCont.Response_Status = 'Error';
          simCont.Response_Message = responseValidityCheck[1] + '';
          this.resultJsonSub.next(simCont);
        } else {

          let simItemObjsArray = new Array();

          let similarItems = this.jsonDataFetched.getSimilarItemsResponse.itemRecommendations.item;
          for (let s = 0; s < similarItems.length; s++) {
            let simCont = new SimilarItemContent();
            simCont.Response_Status = 'Success';

            if (similarItems[s].imageURL != null) {
              simCont.Image_URL = similarItems[s].imageURL;
            }

            if (similarItems[s].title != null) {
              simCont.Product_Name = similarItems[s].title;
            }

            if (similarItems[s].buyItNowPrice != null) {
              simCont.Price = similarItems[s].buyItNowPrice.__value__;
            }

            if (similarItems[s].shippingCost != null) {
              simCont.Shipping_Cost = similarItems[s].shippingCost.__value__;
            }

            if (similarItems[s].timeLeft != null) {
              simCont.Days_Left = similarItems[s].timeLeft.substring(1,similarItems[s].timeLeft.indexOf("D"));
            }

            simItemObjsArray.push(simCont);
          }

          console.log(simItemObjsArray);

          this.resultJsonSub.next(simItemObjsArray);

        }
      });
  }

  buildEbayUrl(itemId) {

    let tempEbayUrl = 'http://svcs.ebay.com/MerchandisingService?';
    tempEbayUrl += 'OPERATION-NAME=getSimilarItems';
    tempEbayUrl += '&SERVICE-NAME=MerchandisingService';
    tempEbayUrl += '&SERVICE-VERSION=1.1.0';
    tempEbayUrl += '&CONSUMER-ID=' + 'SarveshP-sarveshp-PRD-4a6d4ee64-9b547e7c';
    tempEbayUrl += '&RESPONSE-DATA-FORMAT=JSON';
    tempEbayUrl += '&REST-PAYLOAD';
    tempEbayUrl += '&itemId=' + itemId;
    tempEbayUrl += '&maxResults=20';

    console.log(tempEbayUrl);

    return tempEbayUrl;
  }

  private isFetchedResponseValid(jsonObj) {
    let errMsg = '';
    let retrievedValidSimilarItems = true;
    if (jsonObj == null || jsonObj.length == 0) {
      retrievedValidSimilarItems = false;
      errMsg = 'No Records';
    } else if (jsonObj.getSimilarItemsResponse == null) {
      retrievedValidSimilarItems = false;
      errMsg = 'No Records';
    } else if (jsonObj.getSimilarItemsResponse.itemRecommendations == null) {
      retrievedValidSimilarItems = false;
      errMsg = 'No Records';
    } else if (jsonObj.getSimilarItemsResponse.itemRecommendations.item == null
      || jsonObj.getSimilarItemsResponse.itemRecommendations.item.length == 0) {
      retrievedValidSimilarItems = false;
      errMsg = 'No Records';
    }
    return [retrievedValidSimilarItems, errMsg];


  }
}
