import {Injectable, EventEmitter, Output} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Subject, Observable} from 'rxjs';
import {ProductContent} from '../components/item-details/product-tab-details/ProductContent';
import {SimilarItemContent} from '../components/item-details/similar-items-tab-details/SimilarItemContent';
import {Util} from '../utility/Util';

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

    let url = 'http://node-dot-csci-571-webtech-8.appspot.com/ebay/similar/' + params;
    // let url = 'http://localhost:3000/ebay/similar/' + params;
    // let url = Util.buildEbaySimilarItemsUrl(itemId);

    console.log("URL Hit for ebay similar-items call : " + url);

    let response = this.http.get(url);

    response.subscribe(
      data => {

        console.log(data);

        this.jsonDataFetched = data;
        let responseValidityCheck = this.isFetchedResponseValid(this.jsonDataFetched);
        if (!responseValidityCheck[0]) {
          let simCont = new SimilarItemContent();
          let simItemObjsArray = new Array();

          simCont.Response_Status = 'Error';
          simCont.Response_Message = responseValidityCheck[1] + '';

          simItemObjsArray.push(simCont);

          console.log(simItemObjsArray);

          this.resultJsonSub.next(simItemObjsArray);
        } else {

          let simItemObjsArray = new Array();

          let similarItems = this.jsonDataFetched.getSimilarItemsResponse.itemRecommendations.item;
          for (let s = 0; s < similarItems.length; s++) {
            let simCont = new SimilarItemContent();
            simCont.Response_Status = 'Success';

            if (similarItems[s].itemId != null) {
              simCont.Item_Id = similarItems[s].itemId;
            }

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

            if (similarItems[s].viewItemURL != null) {
              simCont.View_Item_URL = similarItems[s].viewItemURL;
            }

            simItemObjsArray.push(simCont);
          }

          console.log(simItemObjsArray);

          this.resultJsonSub.next(simItemObjsArray);

        }
      },
      err => {
        let simCont = new SimilarItemContent();
        let simItemObjsArray = new Array();

        simCont.Response_Status = 'Error';
        simCont.Response_Message = "Network Connectivity Issues";

        simItemObjsArray.push(simCont);

        console.log(simItemObjsArray);

        this.resultJsonSub.next(simItemObjsArray);
      });
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
