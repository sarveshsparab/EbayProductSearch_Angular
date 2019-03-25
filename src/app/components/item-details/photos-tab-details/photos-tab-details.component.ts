import {Component, Input, OnInit} from '@angular/core';
import {PhotoContent} from './PhotoContent';

@Component({
  selector: 'app-photos-tab-details',
  templateUrl: './photos-tab-details.component.html',
  styleUrls: ['./photos-tab-details.component.css']
})
export class PhotosTabDetailsComponent implements OnInit {
  @Input("photosTab_content") content: PhotoContent[];
  errorState: any;
  error_msg: any;

  constructor() { }

  ngOnInit() {
    if(this.content.length > 0){
      if(this.content[0].Response_Status == 'Error'){
        this.errorState = true;
        this.error_msg = this.content[0].Response_Message;
      } else {
        this.errorState = false;
        this.error_msg = '';
      }
    }
  }

}
