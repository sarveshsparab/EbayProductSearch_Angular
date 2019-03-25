import {Component, Input, OnChanges, ChangeDetectorRef, SimpleChanges} from '@angular/core';
import {ProductContent} from './ProductContent';

@Component({
  selector: 'app-product-tab-details',
  templateUrl: './product-tab-details.component.html',
  styleUrls: ['./product-tab-details.component.css']
})
export class ProductTabDetailsComponent implements OnChanges{
  @Input("productTab_content") content: ProductContent;

  constructor() { }


  ngOnChanges(): void {

    if(!this.content){
      return;
    }

  }

}
