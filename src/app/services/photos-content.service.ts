import {Injectable, EventEmitter, Output} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Subject, Observable} from 'rxjs';
import {PhotoContent} from '../components/item-details/photos-tab-details/PhotoContent';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PhotosContentService {

  private resultJsonSub = new Subject();
  resultJsonOb = this.resultJsonSub.asObservable();
  private jsonDataFetched: any;

  constructor(private http: HttpClient) {
  }

  fetchPhotos(queryString) {
    let params = new HttpParams()
      .set('queryString', queryString);

    let response = this.http.get(this.buildImageSearchUrl(queryString));

    response.subscribe(
      data => {
        this.jsonDataFetched = data;
        let responseValidityCheck = this.isFetchedResponseValid(this.jsonDataFetched);
        if (responseValidityCheck[0]) {
          let photosArray = new Array();
          let photoCont = new PhotoContent();

          photoCont.Response_Status = "Error";
          photoCont.Response_Message = responseValidityCheck[1]+"";

          photosArray.push(photoCont);

          console.log(photosArray);

          this.resultJsonSub.next(photosArray);
        } else {

          let photosArray = new Array();

          let photoItems = this.jsonDataFetched.items;
          for (let s = 0; s < photoItems.length; s++) {
            let photoCont = new PhotoContent();
            photoCont.Response_Status = "Success";

            if (photoItems[s].link != null) {
              photoCont.Photo_Link = photoItems[s].link;
            }

            if (photoItems[s].image != null || photoItems[s].image.height != null) {
              photoCont.Photo_Height = photoItems[s].image.height;
            }

            if (photoItems[s].image != null || photoItems[s].image.width != null) {
              photoCont.Photo_Width = photoItems[s].image.width;
            }

            photosArray.push(photoCont);
          }

          console.log(photosArray);

          this.resultJsonSub.next(photosArray);
        }
      });
  }

  buildImageSearchUrl(queryString) {

    let tempUrl = 'https://www.googleapis.com/customsearch/v1?';
    tempUrl += 'q=' + encodeURI(queryString);
    tempUrl += '&cx=016865113679854894358:-ggfxfoc38i';
    tempUrl += '&imgSize=huge';
    tempUrl += '&imgType=news';
    tempUrl += '&num=8';
    tempUrl += '&searchType=image';
    tempUrl += '&key=AIzaSyBZtSgUprgt5sQE9Mb3j7nnIOv-lpK43SM';

    console.log(tempUrl);

    return tempUrl;
  }

  private isFetchedResponseValid(jsonObj) {
    let errMsg = '';
    let retrievedPhotos = true;

    if(jsonObj == null) {
      retrievedPhotos = false;
      errMsg = 'No Photos Found';
    }else if (jsonObj.items == null || jsonObj.items.length == 0) {
      retrievedPhotos = false;
      errMsg = 'No Photos Found';
    }

    return [retrievedPhotos, errMsg];
  }
}
