import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {SimilarItemContent} from './SimilarItemContent';
import {min} from 'rxjs/operators';

@Component({
  selector: 'app-similar-items-tab-details',
  templateUrl: './similar-items-tab-details.component.html',
  styleUrls: ['./similar-items-tab-details.component.css']
})
export class SimilarItemsTabDetailsComponent implements OnInit, OnChanges {
  @Input("similarItemsTab_content") content: SimilarItemContent[];
  errorState: any;
  error_msg: any;

  sortPref = [
    "Default",
    "Product Name",
    "Days Left",
    "Price",
    "Shipping Cost"
  ];
  orderPref = [
    "Ascending",
    "Descending"
  ];
  simItemSortPref: any;
  simItemOrderPref: any;
  itemCount: number;
  moreLessBtnLabel: any;
  isMoreLessBtnNeeded: boolean;
  orderSortDisabled: boolean;
  orderedSimItems = new Array();

  constructor() { }

  ngOnInit() {

    if(this.content.length > 0){
      if(this.content[0].Response_Status == 'Error'){
        this.errorState = true;
        this.error_msg = this.content[0].Response_Message;
      } else {
        this.errorState = false;
        this.error_msg = '';
      }
    }

    this.simItemSortPref = 0;
    this.simItemOrderPref = 0;
    this.itemCount = Math.min(5, this.content.length);
    this.moreLessBtnLabel = 'Show More';
    this.isMoreLessBtnNeeded = this.content.length >= 5;
    this.orderSortDisabled = true;
  }

  moreLessBtnClick() {
    if(this.moreLessBtnLabel == 'Show More'){
      this.moreLessBtnLabel = 'Show Less';
      this.itemCount = this.content.length;
    } else {
      this.moreLessBtnLabel = 'Show More';
      this.itemCount = Math.min(5, this.content.length);
    }
  }

  sortItems() {
    switch (this.simItemSortPref) {
      case '0':
        this.orderSortDisabled = true;
        this.orderedSimItems = this.makeCopy(this.content);
        break;
      case '1':
        this.orderedSimItems.sort(function (a, b) {
          return a.Product_Name.localeCompare(b.Product_Name);
        });
        this.orderSortDisabled = false;
        break;
      case '2':
        this.orderedSimItems.sort(function (a, b) {
          return parseFloat(a.Days_Left)-parseFloat(b.Days_Left);
        });
        this.orderSortDisabled = false;
        break;
      case '3':
        this.orderedSimItems.sort(function (a, b) {
          return parseFloat(a.Price)-parseFloat(b.Price);
        });
        this.orderSortDisabled = false;
        break;
      case '4':
        this.orderedSimItems.sort(function (a, b) {
          return parseFloat(a.Shipping_Cost)-parseFloat(b.Shipping_Cost);
        });
        this.orderSortDisabled = false;
        break;
    }

    if(!this.orderSortDisabled){
      if(this.simItemOrderPref == '1')
        this.orderedSimItems.reverse();
    }
  }

  ngOnChanges(): void {
    this.orderedSimItems = this.makeCopy(this.content);
    this.simItemSortPref = 0;
    this.simItemOrderPref = 0;
    this.itemCount = Math.min(5, this.content.length);
    this.moreLessBtnLabel = 'Show More';
    this.isMoreLessBtnNeeded = this.content.length >= 5;
    this.orderSortDisabled = true;
  }

  makeCopy(original){
    let newArray = [];
    for (var i = 0; i < original.length; i++) {
      let sic = new SimilarItemContent();
      sic.Item_Id = original[i].Item_Id;
      sic.Image_URL = original[i].Image_URL;
      sic.Product_Name = original[i].Product_Name;
      sic.Price = original[i].Price;
      sic.Shipping_Cost = original[i].Shipping_Cost;
      sic.Days_Left = original[i].Days_Left;
      sic.View_Item_URL = original[i].View_Item_URL;
      sic.Response_Status = original[i].Response_Status;
      sic.Response_Message = original[i].Response_Message;

      newArray.push(sic);
    }
    return newArray;
  }
}
