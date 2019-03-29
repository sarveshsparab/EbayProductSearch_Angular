import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import {Util} from '../utility/Util';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProdSearchService {
  showListings = false;

  private resultJsonSub = new Subject();
  resultJsonOb = this.resultJsonSub.asObservable();

  service: any;
  private jsonDataFetched: any;

  private clearTriggerSub = new Subject();
  clearTriggerOb = this.clearTriggerSub.asObservable();

  private isDataReceivedSub = new Subject();
  isDataReceivedOb = this.isDataReceivedSub.asObservable();

  constructor(private http: HttpClient) { }

  private listingResults: any;

  fetchFromEbay(psForm) {
    console.log(psForm);
    this.showListings = true;

    let zipCode = '';
    if (psForm.zipCodeType === 'cust')
      zipCode = psForm.custZipCode;
    else
      zipCode = psForm.currZipCode;

    let params = new HttpParams()
      .set('keyword', encodeURI(psForm.keyword))
      .set('category', psForm.category)
      .set('miles', psForm.miles || '10')
      .set('condNew', psForm.condNew || 'false')
      .set('condUsed', psForm.condUsed || 'false')
      .set('condUnspecified', psForm.condUnspecified || 'false')
      .set('freeShipping', psForm.freeShipping || 'false')
      .set('localPickup', psForm.localPickup || 'false')
      .set('zipCodeType', psForm.zipCodeType)
      .set('currZipCode', psForm.currZipCode || '')
      .set('custZipCode', psForm.custZipCode || '')
      .set('zipcode', zipCode);


    let tempEbayUrl = 'http://node-dot-csci-571-webtech-8.appspot.com/ebay/find/' + params;
    // let tempEbayUrl = 'http://localhost:3000/ebay/find/' + params;
    // let tempEbayUrl = Util.buildEbayFindingUrl(psForm, zipCode);

    console.log(tempEbayUrl);
    console.log(params);

    let response = this.http.get(tempEbayUrl);

    response.subscribe(
      data => {
        this.jsonDataFetched = data;
        this.isDataReceivedSub.next(true);
        this.listingResults = data;

        let responseValidityCheck = this.isFetchedResponseValid(this.jsonDataFetched);
        if (!responseValidityCheck[0]) {
          console.log(responseValidityCheck[1]);
          this.resultJsonSub.next({"responseStatus": "Error", "responseContent":  "" + responseValidityCheck[1] + "" });
        } else {
          let ebayErrorCheck = this.isThereAnyEbayError(this.jsonDataFetched);
          if (ebayErrorCheck[0]) {
            this.resultJsonSub.next({"responseStatus": "Error", "responseContent": "" + ebayErrorCheck[1] + "" });
          } else {
            this.resultJsonSub.next({"responseStatus": "Success", "responseContent": this.jsonDataFetched.findItemsAdvancedResponse[0].searchResult[0].item });
          }
        }

      },
      err => {
        this.isDataReceivedSub.next(true);
        this.resultJsonSub.next({"responseStatus": "Error", "responseContent": "Network Connectivity Issues" });
      }
    );
  }

  isThereAnyEbayError(jsonObj){
    let anyEbayError = false;
    let errMsg = '';
    if(jsonObj.findItemsAdvancedResponse[0].ack[0] == "Failure"){
      if(jsonObj.findItemsAdvancedResponse[0].errorMessage !=null
        && jsonObj.findItemsAdvancedResponse[0].errorMessage.length !=0){
        if(jsonObj.findItemsAdvancedResponse[0].errorMessage[0].error !=null
          && jsonObj.findItemsAdvancedResponse[0].errorMessage[0].error.length !=0){
          if(jsonObj.findItemsAdvancedResponse[0].errorMessage[0].error[0].errorId !=null
            && jsonObj.findItemsAdvancedResponse[0].errorMessage[0].error[0].errorId.length !=0){
            if(jsonObj.findItemsAdvancedResponse[0].errorMessage[0].error[0].errorId[0] == "18"){
              anyEbayError = true;
              errMsg = 'Invalid Zip Code';
            } else if(jsonObj.findItemsAdvancedResponse[0].errorMessage[0].error[0].errorId[0] == "36"){
              anyEbayError = true;
              errMsg = 'Invalid Keyword';
            } else {
              anyEbayError = true;
              errMsg = 'EBAY Findings API error' + jsonObj.findItemsAdvancedResponse[0].errorMessage[0].error[0].message[0];
            }
          }
        }
      }
    }
    return [anyEbayError, errMsg];

  }

  isFetchedResponseValid(jsonObj){
    let retrievedValidItems = true;
    let errMsg = '';
    if(jsonObj == null || jsonObj.length == 0) {
      retrievedValidItems = false;
      errMsg = 'No Records';
    } else if (jsonObj.findItemsAdvancedResponse == null || jsonObj.findItemsAdvancedResponse.length == 0) {
      retrievedValidItems = false;
      errMsg = 'No Records';
    } else if (jsonObj.findItemsAdvancedResponse[0].searchResult == null ||
      jsonObj.findItemsAdvancedResponse[0].searchResult.length == 0) {
      retrievedValidItems = false;
      errMsg = 'No Records';
    } else if (jsonObj.findItemsAdvancedResponse[0].searchResult[0].item == null ||
      jsonObj.findItemsAdvancedResponse[0].searchResult[0].item.length == 0) {
      retrievedValidItems = false;
      errMsg = 'No Records';
    }
    return [retrievedValidItems, errMsg];
  }

  didGetValidResponse(){
    this.isDataReceivedSub.next(true);
  }

  loadFetchedJsonData() {
    this.resultJsonSub.next(this.jsonDataFetched);
  }

  pssClear() {
    this.resultJsonSub.next({"responseStatus": "Clear", "responseContent": "clearTriggered" });
    this.jsonDataFetched = undefined;
    this.clearTriggerSub.next(true);
  }
}
