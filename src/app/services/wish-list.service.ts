import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {WishListContent} from '../components/wish-list/WishListContent';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  private wishListSub = new Subject();
  wishListOb = this.wishListSub.asObservable();

  private wishListModifiedSub = new Subject();
  wishListModifiedOb = this.wishListModifiedSub.asObservable();

  constructor() { }

  addToWishList(wlObj: WishListContent){
    let currTS = new Date();
    wlObj.TS = currTS;
    localStorage.setItem(wlObj.ItemID, JSON.stringify(wlObj));
    this.fetchEntireWishList();
  }

  removeFromWishList(wlObj: WishListContent){
    localStorage.removeItem(wlObj.ItemID);
    this.fetchEntireWishList();
  }

  fetchEntireWishList() {
    let wlObjArr = [];
    let lsArr = new Array(localStorage.length);

    for(let i=0;i<localStorage.length;i++){
      lsArr[i] = JSON.parse(localStorage.getItem(localStorage.key((i))));
    }

    lsArr.sort((a, b) => {
        if(a.TS > b.TS){
          return 1;
        } else {
          return -1;
        }
    });

    if(localStorage.length == 0){
      let wlObjArr = new Array();
      let wlObj = new WishListContent();

      wlObj.Response_Status = "Error";
      wlObj.Response_Message = "No Records";

      wlObjArr.push(wlObj);
      this.wishListSub.next(wlObjArr);
      this.wishListModifiedSub.next(true);
      return;
    }

    for(let i=0;i<localStorage.length;i++){
      let wlObj = lsArr[i];
      wlObj.Response_Status = 'Success';
      wlObj.Response_Message = '';
      wlObjArr.push(wlObj);
    }

    this.wishListSub.next(wlObjArr);
    this.wishListModifiedSub.next(true);

  }

  isOnWishList(itemIdArray: Array<string>){
    let res = [];
    for(let itemId of itemIdArray){
      if(localStorage.getItem(itemId)){
        res.push(true);
      } else {
        res.push(false);
      }
    }
    return res;
  }
}
