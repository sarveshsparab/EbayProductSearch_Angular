import {Injectable, EventEmitter, Output} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Subject, Observable} from 'rxjs';
import {ProductContent} from '../components/item-details/product-tab-details/ProductContent';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ProductContentService {

  private resultJsonSub = new Subject();
  resultJsonOb = this.resultJsonSub.asObservable();
  private jsonDataFetched: any;

  constructor(private http: HttpClient) {
  }

  fetchProductDetails(itemId) {

    let params = new HttpParams()
      .set('itemid', itemId);

    let response = this.http.get(this.buildEbayUrl(itemId));

    response.subscribe(
      data => {
        this.jsonDataFetched = data;
        let responseValidityCheck = this.isFetchedResponseValid(this.jsonDataFetched);
        if (!responseValidityCheck[0]) {
          let prodCont = new ProductContent();
          prodCont.Response_Status = "Error";
          prodCont.Response_Message = responseValidityCheck[1]+"";
          this.resultJsonSub.next(prodCont);
        } else {
          let prodCont = new ProductContent();
          prodCont.Response_Status = "Success";

          if(this.jsonDataFetched.Item.PictureURL != null) {
            for (let i=0;i<this.jsonDataFetched.Item.PictureURL.length;i++){
              prodCont.Product_Images.push(this.jsonDataFetched.Item.PictureURL[i]);
            }
          }

          if(this.jsonDataFetched.Item.Subtitle != null) {
            prodCont.Subtitle = this.jsonDataFetched.Item.Subtitle;
          }

          if(this.jsonDataFetched.Item.CurrentPrice != null && this.jsonDataFetched.Item.CurrentPrice.Value != null) {
            prodCont.Price = "$" + this.jsonDataFetched.Item.CurrentPrice.Value;
          }

          if(this.jsonDataFetched.Item.Location != null) {
            prodCont.Location = this.jsonDataFetched.Item.Location;
          }

          if(this.jsonDataFetched.Item.ReturnPolicy != null && this.jsonDataFetched.Item.ReturnPolicy.ReturnsAccepted != null ) {
            prodCont.Return_Policy = this.jsonDataFetched.Item.ReturnPolicy.ReturnsAccepted;
            if (this.jsonDataFetched.Item.ReturnPolicy.ReturnsWithin != null) {
              prodCont.Return_Policy += " within " + this.jsonDataFetched.Item.ReturnPolicy.ReturnsWithin;
            }
          }

          if(this.jsonDataFetched.Item.ItemSpecifics != null && this.jsonDataFetched.Item.ItemSpecifics.NameValueList != null) {
            let specificsRows = this.jsonDataFetched.Item.ItemSpecifics.NameValueList;
            for(let r=0; r < specificsRows.length; r++){
              if(specificsRows[r] != null && specificsRows[r].Name != null && specificsRows[r].Value != null ) {
                prodCont.Item_Specifics.push([specificsRows[r].Name, specificsRows[r].Value[0]]);
              }
            }
          }

          console.log(prodCont);

          this.resultJsonSub.next(prodCont);
        }
      }, err => {
        this.resultJsonSub.next("EMPTY_RESPONSE");
      });
  }

  buildEbayUrl(itemId) {

    let tempEbayUrl = 'http://open.api.ebay.com/shopping?';
    tempEbayUrl += 'callname=GetSingleItem';
    tempEbayUrl += '&responseencoding=JSON';
    tempEbayUrl += '&appid=' + 'SarveshP-sarveshp-PRD-4a6d4ee64-9b547e7c';
    tempEbayUrl += '&siteid=0';
    tempEbayUrl += '&version=967';
    tempEbayUrl += '&ItemID=' + itemId;
    tempEbayUrl += '&IncludeSelector=Description,Details,ItemSpecifics';

    console.log(tempEbayUrl);

    return tempEbayUrl;
  }

  private isFetchedResponseValid(jsonObj) {
    let errMsg = '';
    let retrievedValidItemDetails = true;

    if(jsonObj == null || jsonObj.length == 0) {
      retrievedValidItemDetails = false;
      errMsg = 'No Item Details have been found';
    }else if (jsonObj.Item == null || jsonObj.Item.length == 0) {
      retrievedValidItemDetails = false;
      errMsg = 'No Item Details have been found';
    }

    return [retrievedValidItemDetails, errMsg];
  }
}
