import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {ProdSearchService} from '../../services/prod-search.service';
import {trigger, state, style, transition, animate} from '@angular/animations';

@Component({
  selector: 'app-prod-results',
  templateUrl: './prod-results.component.html',
  styleUrls: ['./prod-results.component.css'],
  animations: [
    trigger('linearSiblingAnimation', [
      transition("* => listing", [
        style({transform: 'translateX(-100%)'}),
        animate('500ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition("* => details", [
        style({transform: 'translateX(100%)'}),
        animate('500ms ease-in', style({transform: 'translateX(0%)'}))
      ])
    ])
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

  constructor(private pss: ProdSearchService) {
    this.pss.clearTriggerOb.subscribe(data => {
      this.clearTriggered = true;
      this.itemId = null;
      this.itemInfo = null;
      this.showListings();
      this.isListingShown = false;
    });
    this.pss.isDataReceivedOb.subscribe(data => {
      this.showListings();
      this.isListingShown = true;
      this.clearTriggered = false;
      this.submitEvent = false;
    });
  }

  isListingShown = true;
  isWishListShown = false;

  itemId = '';
  itemInfo = '';

  hideDetailsAndShowListing(panel) {
    this.clearTriggered = false;
    this.activeSibling = panel;
  }

  hideListingAndShowDetails(event) {
    this.clearTriggered = false;
    this.activeSibling = event.activeSibling;
    this.itemId = event.itemId;
    this.itemInfo = event.itemInfo;
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
  }

}
