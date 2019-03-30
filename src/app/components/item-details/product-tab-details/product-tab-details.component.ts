import {Component, Input, OnChanges, ChangeDetectorRef, SimpleChanges, OnInit} from '@angular/core';
import {ProductContent} from './ProductContent';

@Component({
  selector: 'app-product-tab-details',
  templateUrl: './product-tab-details.component.html',
  styleUrls: ['./product-tab-details.component.css']
})
export class ProductTabDetailsComponent implements OnChanges, OnInit{
  @Input("productTab_content") content: ProductContent;
  errorState: any;
  error_msg: any;

  constructor() { }


  ngOnChanges(): void {
    if(!this.content){
      return;
    }
  }

  ngOnInit(): void {
    if(this.content.Response_Status == 'Error'){
      this.errorState = true;
      this.error_msg = this.content.Response_Message;
    } else {
      this.errorState = false;
      this.error_msg = '';
    }
  }

}
