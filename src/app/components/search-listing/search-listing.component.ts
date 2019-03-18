import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ItemDetailsService } from '../../services/item-details.service';
import { WishListService } from '../../services/wish-list.service';
import { ProdSearchService } from '../../services/prod-search.service';

@Component({
  selector: 'app-search-listing',
  templateUrl: './search-listing.component.html',
  styleUrls: ['./search-listing.component.css']
})
export class SearchListingComponent implements OnInit {
  @Output() slide = new EventEmitter<string>();
  @Input("place") selectedRow: any;

  displayListings = false;
  resultJson = null;
  nextPage: any;
  prevPage: any = false;
  curPage = 1;
  service: any;
  isFavorite: any;
  errorState: boolean = false;

  constructor(private pss: ProdSearchService, private ids: ItemDetailsService, private wls: WishListService) {
    this.pss.resultJsonOb.subscribe(data => {
      console.log("EbayFindingsApi");
      console.log(data);
      if (data === null) {
        this.errorState = true;
        this.displayListings = true;
      } else if (data === undefined) {

      }
      // else if (data["response"]["status"] == 'EMPTY') {
      //   // console.log("3");
      //   this.resultJson = null;
      //   this.displayListings = true;
      // }
      else if(data == 'clear') {
        // console.log("4");
        this.resultJson = null;
        this.displayListings = true;
        this.selectedRow = null;
      }
      else {
        // console.log("5");
        this.resultJson = ["one", "two", "three"];
        //this.checkFavorite();
        this.errorState = false;
        this.displayListings = true;
      }


    });
  }

  highlightRow(placeId) {
    this.selectedRow = placeId;
  }

  // showDetails() {
  //   this.slide.emit({ slide: "left", place: this.selectedRow });
  // }

  // getDetails(placeId) {
  //   this.highlightRow(placeId);
  //   //this.dService.getDetails(placeId, this.startLocation, this.geoJson);
  //   this.slide.emit({ slide: "left", place: placeId });
  // }

  ngOnInit() {
    this.pss.loadFetchedJsonData();
    this.curPage = 1;
  }

}
