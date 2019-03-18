import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {
  @Output() slide = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

}
