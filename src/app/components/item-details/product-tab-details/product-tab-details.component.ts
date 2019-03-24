import {Component, Input, OnChanges, ChangeDetectorRef, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-product-tab-details',
  templateUrl: './product-tab-details.component.html',
  styleUrls: ['./product-tab-details.component.css']
})
export class ProductTabDetailsComponent implements OnChanges{
  @Input("productTab_content") content: any;

  constructor() { }


  ngOnChanges(): void {

    if(!this.content){
      return;
    }

    alert(this.content);


  }

}
