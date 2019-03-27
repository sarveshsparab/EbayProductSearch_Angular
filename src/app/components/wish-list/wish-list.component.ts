import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WishListService} from '../../services/wish-list.service';
import {ItemDetailsService} from '../../services/item-details.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {
  @Output() transmitEvent = new EventEmitter<any>();
  @Input("itemInfo") selectedItemInfo: any;
  @Input("itemId") selectedItemId: any;

  wishListArray: any;
  isAnyWishListItem: boolean;
  error_msg: any;
  totalShoppingVal: string;

  constructor(private wls: WishListService, private ids: ItemDetailsService) {
    this.wls.wishListOb.subscribe(data => {
      this.wishListArray = data;
      console.log(data);
      if(this.wishListArray.length <= 1){
        if(this.wishListArray[0].Response_Status == 'Error'){
          this.isAnyWishListItem = false;
          this.error_msg = this.wishListArray[0].Response_Message;
          this.totalShoppingVal = '$0';
        } else {
          this.isAnyWishListItem = true;
          this.error_msg = '';
          this.totalShoppingVal = this.wishListArray[0].Price;
        }
      } else {
        this.isAnyWishListItem = true;
        this.error_msg = '';
        this.totalShoppingVal = '$' + this.wishListArray
          .map(data => parseFloat(data.Price.substring(1)))
          .reduce((acc, currVal) => acc + currVal).toString();
      }
    });
  }

  removeFromWishList(wlObj){
    this.wls.removeFromWishList(wlObj);
  }

  ngOnInit() {
    this.loadEntireWishList();
  }

  private loadEntireWishList() {
    this.wls.fetchEntireWishList();
  }

  getItemDetails() {
    this.ids.getAllItemDetailsForWishList(this.selectedItemInfo);
    this.transmitEvent.emit({activeSibling: 'details', itemId: this.selectedItemId, itemInfo: this.selectedItemInfo});
  }

  fetchItemDetails(rowdata) {
    this.selectedItemInfo = rowdata;
    this.selectedItemId = rowdata.ItemID;
    this.getItemDetails();
  }

  processTitle(title) {
    if (title == null || title.length == 0 || title=='N/A') {
      return 'N/A';
    } else {
      let titleLen = title.length;
      if (titleLen < 35) {
        return title;
      } else {
        if (title.substring(0, 35).slice(-1) == ' ') {
          return title.substring(0, 35) + '...';
        } else {
          return title.substring(0, title.substring(0, 35).lastIndexOf(' ')) + '...';
        }
      }
    }
  }

  processImage(Image_URL) {
    if (Image_URL != "N/A") {
      let imageElem = document.createElement('img');
      imageElem.setAttribute('src', Image_URL);
      imageElem.setAttribute('style', 'height: 135px; width: 135px;');
      return imageElem.outerHTML;
    } else {
      return 'N/A';
    }
  }
}
