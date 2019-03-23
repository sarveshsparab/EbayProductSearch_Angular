import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemDetailsService {
  private itemDetailsDataSub = new Subject();
  itemDetailsDataOb = this.itemDetailsDataSub.asObservable();

  preFetchedItemDetailsData: any;


  constructor() { }

  getAllItemDetails(){
    this.itemDetailsDataSub.next(this.preFetchedItemDetailsData);
  }
}
