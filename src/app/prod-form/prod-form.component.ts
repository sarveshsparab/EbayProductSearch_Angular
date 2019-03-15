import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prod-form',
  templateUrl: './prod-form.component.html',
  styleUrls: ['./prod-form.component.css']
})
export class ProdFormComponent implements OnInit {

  categoryTypes = [
    'All Categories',
    'Art',
    'Baby',
    'Books',
    'Clothing, Shoes & Accessories',
    'Computers/Tablets & Networking',
    'Health & Beauty',
    'Music',
    'Video Games & Consoles'
  ];

  constructor() { }

  ngOnInit() {
  }

}
