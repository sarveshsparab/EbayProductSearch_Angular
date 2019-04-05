import {Component, OnInit, ChangeDetectionStrategy, Input, ViewChild} from '@angular/core';
import {ProdSearchService} from '../../services/prod-search.service';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {SearchListingComponent} from '../search-listing/search-listing.component';
import {WishListComponent} from '../wish-list/wish-list.component';
import {ItemDetailsComponent} from '../item-details/item-details.component';

@Component({
  selector: 'app-prod-results',
  templateUrl: './prod-results.component.html',
  styleUrls: ['./prod-results.component.css'],
  animations: [
    trigger('detailsSiblingAnimation', [
      transition("* => listing", [
        style({transform: 'translateX(0%)'}),
        animate('500ms ease-in', style({transform: 'translateX(-100%)'}))
      ]),
      transition("* => details", [
        style({transform: 'translateX(-100%)'}),
        animate('500ms ease-in', style({transform: 'translateX(0%)'}))
      ])
    ]),
    trigger('listingSiblingAnimation', [
      transition("* => listing", [
        style({transform: 'translateX(100%)'}),
        animate('800ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition("* => details", [
        style({transform: 'translateX(0%)'}),
        animate('500ms ease-in', style({transform: 'translateX(100%)'}))
      ])
    ])

    // trigger('slideInOut', [
    //   transition(':enter', [
    //     style({transform: 'translateY(-100%)'}),
    //     animate('200ms ease-in', style({transform: 'translateY(0%)'}))
    //   ]),
    //   transition(':leave', [
    //     animate('200ms ease-in', style({transform: 'translateY(-100%)'}))
    //   ])
    // ])

  ]
})
export class ProdResultsComponent implements OnInit {

  listingShowTabClass = 'nav-link active show';
  wishListShowTabClass = 'nav-link';

  listingTabContentClass = 'tab-pane fade active show';
  wishListTabContentClass = 'tab-pane fade';

  activeSibling: any;
  clearTriggered = false;

  @Input() submitEvent: boolean;

  @ViewChild(SearchListingComponent) slc;
  @ViewChild(WishListComponent) wlc;
  @ViewChild(ItemDetailsComponent) idc;

  constructor(private pss: ProdSearchService) {
    this.pss.clearTriggerOb.subscribe(data => {
      this.clearTriggered = true;
      this.itemId = null;
      this.wishItemId = null;
      this.itemInfo = null;
      this.showListings();
      this.isListingShown = false;
      this.idc.resetIDC();
    });
    this.pss.isDataReceivedOb.subscribe(data => {
      this.showListings();
      this.activeSibling = 'default';
      this.isListingShown = true;
      this.clearTriggered = false;
      this.submitEvent = false;
      this.slc.currPage = 1;
    });
  }

  isListingShown = true;
  isWishListShown = false;

  wishItemId = '';
  itemId = '';
  itemInfo = '';

  hideDetailsAndShowListing(panel) {
    this.clearTriggered = false;
    this.activeSibling = panel;
  }

  hideListingAndShowDetails(event) {
    this.clearTriggered = false;
    this.activeSibling = event.activeSibling;
    this.itemInfo = event.itemInfo;
    if(event.itemId!=null && event.itemId != '' && event.itemId.length!=0){
      this.itemId = event.itemId;
    }
    if(event.wishItemId!=null && event.wishItemId != '' && event.wishItemId.length!=0){
      this.wishItemId = event.wishItemId;
    }
  }

  showListings() {
    this.clearTriggered = false;
    this.isWishListShown = false;
    this.isListingShown = true;
    this.activeSibling = 'listing';
    this.listingShowTabClass = 'nav-link active show';
    this.wishListShowTabClass = 'nav-link';
    this.listingTabContentClass = 'tab-pane fade active show';
    this.wishListTabContentClass = 'tab-pane fade';
  }

  showWishLists() {
    this.clearTriggered = false;
    this.isListingShown = false;
    this.isWishListShown = true;
    this.activeSibling = 'listing';
    this.listingShowTabClass = 'nav-link';
    this.wishListShowTabClass = 'nav-link active show';
    this.listingTabContentClass = 'tab-pane fade';
    this.wishListTabContentClass = 'tab-pane fade active show';
  }

  ngOnInit() {
    this.activeSibling = 'default';
  }

  listingSlideStart(event) {
    if(this.activeSibling=='listing')
      event.element.classList.remove('hide');
  }
  listingSlideDone(event) {
    if(this.activeSibling=='details')
      event.element.classList.add('hide');
  }

  detailsSlideStart(event) {
    if(this.activeSibling=='details')
      event.element.classList.remove('hide');
  }
  detailsSlideDone(event) {
    if(this.activeSibling=='listing')
      event.element.classList.add('hide');
  }
}
