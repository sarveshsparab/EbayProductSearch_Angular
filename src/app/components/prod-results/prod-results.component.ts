import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ProdSearchService } from '../../services/prod-search.service';
import { ItemDetailsService } from '../../services/item-details.service';
import { trigger, state, style, transition, animate } from "@angular/animations";

@Component({
  selector: 'app-prod-results',
  templateUrl: './prod-results.component.html',
  styleUrls: ['./prod-results.component.css'],
  animations: [
    trigger("slideAnimation", [
      transition("* => right", [
        style({right: '-100%'}),
        animate('.5s ease-in', style({right:0}))
      ]),
      transition("* => left", [
        style({left: '-100%'}),
        animate('1s ease-in', style({left:0}))
      ]),
    ])
  ]
})
export class ProdResultsComponent implements OnInit {

  canShowResultTable = true;
  canShowWishList = false;

  listingShowTabClass = "nav-link active show";
  wishListShowTabClass = "nav-link";

  listingTabContentClass = "tab-pane fade active show";
  wishListTabContentClass = "tab-pane fade";

  active: any;
  clear = false;

  constructor(private pss: ProdSearchService, private ids: ItemDetailsService) {
    this.pss.isDataReceivedOb.subscribe(data=> {
      this.showListings();
      this.isListingShown = true;
      this.clear = false;
    });
  }

  isListingShown = true;
  isWishListShown = false;

  itemId = "";
  itemInfo = "";

  slideRight(panel) {
    this.clear = false;
    this.active = panel;
  }

  slideLeft(event) {
    this.clear = false;
    this.active = event.slide;
    this.itemId = event.itemId;
    this.itemInfo = event.itemInfo;
  }

  showListings() {
    this.clear = false;
    this.isWishListShown = false;
    this.isListingShown = true;
    this.active = 'right';
    this.listingShowTabClass = "nav-link active show";
    this.wishListShowTabClass = "nav-link";
    this.listingTabContentClass = "tab-pane fade active show";
    this.wishListTabContentClass = "tab-pane fade";
  }

  showWishLists() {
    this.clear = false;
    this.isListingShown = false;
    this.isWishListShown = true;
    this.active = 'right';
    this.listingShowTabClass = "nav-link";
    this.wishListShowTabClass = "nav-link active show";
    this.listingTabContentClass = "tab-pane fade";
    this.wishListTabContentClass = "tab-pane fade active show";
  }
  ngOnInit() {
  }

}
