import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  @Output() slide = new EventEmitter<string>();

  constructor() {

  }

  ngOnInit() {

  }

}
