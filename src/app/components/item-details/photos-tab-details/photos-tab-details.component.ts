import {Component, Input, OnInit} from '@angular/core';
import {PhotoContent} from './PhotoContent';

@Component({
  selector: 'app-photos-tab-details',
  templateUrl: './photos-tab-details.component.html',
  styleUrls: ['./photos-tab-details.component.css']
})
export class PhotosTabDetailsComponent implements OnInit {
  @Input("photosTab_content") content: PhotoContent[];

  constructor() { }

  ngOnInit() {
  }

}
