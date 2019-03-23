import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-similar-items-tab-details',
  templateUrl: './similar-items-tab-details.component.html',
  styleUrls: ['./similar-items-tab-details.component.css']
})
export class SimilarItemsTabDetailsComponent implements OnInit {
  @Input("similarItemsTab_content") selectedItem: any;

  constructor() { }

  ngOnInit() {
  }

}
