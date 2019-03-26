import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

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

  private detailsJsonSub = new Subject();
  detailsJsonOb = this.detailsJsonSub.asObservable();

  private isClearSub = new Subject();
  isClearOb = this.isClearSub.asObservable();

  private isDataReceivedSub = new Subject();
  isDataReceivedOb = this.isDataReceivedSub.asObservable();

  constructor(private http: HttpClient) { }

  private listingResults: any;

  fetchFromEbay(psForm) {
    console.log(psForm);
    this.showListings = true;

    let zipCode = '';
    if (psForm.zipCodeType === 'curr')
      zipCode = psForm.currZipCode;
    else
      zipCode = psForm.custZipCode;

    let params = new HttpParams()
      .set('keyword', encodeURI(psForm.keyword))
      .set('category', psForm.category)
      .set('miles', psForm.miles || '10')
      .set('condNew', psForm.condNew || 'false')
      .set('condUsed', psForm.condUsed || 'false')
      .set('condUnspecified', psForm.condUnspecified || 'false')
      .set('freeShipping', psForm.freeShipping || 'false')
      .set('localPickup', psForm.localPickup || 'false')
      .set('zipcode', zipCode);


    let tempEbayUrl = this.buildEbayUrl(psForm, zipCode);
    console.log(tempEbayUrl);

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
        this.resultJsonSub.next(null);
      }
    );
  }

  buildEbayUrl(psForm, zipCode){
    let itemFilterNameCount = 0

    let tempEbayUrl = 'http://svcs.ebay.com/services/search/FindingService/v1?';
    tempEbayUrl += 'OPERATION-NAME=findItemsAdvanced';
    tempEbayUrl += '&SERVICE-VERSION=1.0.0';
    tempEbayUrl += '&SECURITY-APPNAME=' + 'SarveshP-sarveshp-PRD-4a6d4ee64-9b547e7c';
    tempEbayUrl += '&RESPONSE-DATA-FORMAT=JSON';
    tempEbayUrl += '&REST-PAYLOAD';
    tempEbayUrl += '&paginationInput.entriesPerPage=50';
    tempEbayUrl += '&keywords=' + encodeURI(psForm.keyword);
    tempEbayUrl += '&buyerPostalCode=' + zipCode;
    if (psForm.category != -1) {
      tempEbayUrl += '&categoryId=' + psForm.category;
    }
    tempEbayUrl += '&itemFilter(' + itemFilterNameCount + ').name=MaxDistance';
    tempEbayUrl += '&itemFilter(' + itemFilterNameCount + ').value=' + (psForm.miles || '10');
    itemFilterNameCount++;
    if (psForm.freeShipping == true) {
      tempEbayUrl += '&itemFilter(' + itemFilterNameCount + ').name=FreeShippingOnly';
      tempEbayUrl += '&itemFilter(' + itemFilterNameCount + ').value=true';
      itemFilterNameCount++;
    }
    if (psForm.localPickup == true) {
      tempEbayUrl += '&itemFilter(' + itemFilterNameCount + ').name=LocalPickupOnly';
      tempEbayUrl += '&itemFilter(' + itemFilterNameCount + ').value=true';
      itemFilterNameCount++;
    }
    tempEbayUrl += '&itemFilter(' + itemFilterNameCount + ').name=HideDuplicateItems';
    tempEbayUrl += '&itemFilter(' + itemFilterNameCount + ').value=true';
    itemFilterNameCount++;
    if (psForm.condNew == true || psForm.condUsed == true || psForm.condUnspecified == true ){
      tempEbayUrl += '&itemFilter(' + itemFilterNameCount + ').name=Condition';
      let itemFilterValueCount = 0;

      if (psForm.condNew == true) {
        tempEbayUrl += '&itemFilter(' + itemFilterNameCount + ').value(' + itemFilterValueCount + ')=New';
        itemFilterValueCount++;
      }
      if (psForm.condUsed == true) {
        tempEbayUrl += '&itemFilter(' + itemFilterNameCount + ').value(' + itemFilterValueCount + ')=Used';
        itemFilterValueCount++;
      }
      if (psForm.condUnspecified == true) {
        tempEbayUrl += '&itemFilter(' + itemFilterNameCount + ').value(' + itemFilterValueCount + ')=Unspecified';
        itemFilterValueCount++;
      }
      itemFilterNameCount++;
    }
    tempEbayUrl += '&outputSelector(0)=SellerInfo';
    tempEbayUrl += '&outputSelector(1)=StoreInfo';

    return tempEbayUrl;
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
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxx');
  }
}
