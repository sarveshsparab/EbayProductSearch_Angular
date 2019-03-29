import {Injectable, EventEmitter, Output} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Subject, Observable} from 'rxjs';
import {PhotoContent} from '../components/item-details/photos-tab-details/PhotoContent';
import {Util} from '../utility/Util';

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
      .set('queryString', encodeURI(queryString));

    let url = 'http://node-dot-csci-571-webtech-8.appspot.com/photos/' + params;
    // let url = 'http://localhost:3000/photos/' + params;
    // let url = Util.buildGoogleCustomSearchAPIUrl(queryString);

    let response = this.http.get(url);

    response.subscribe(
      data => {
        this.jsonDataFetched = data;

        console.log(this.jsonDataFetched);

        let responseValidityCheck = this.isFetchedResponseValid(this.jsonDataFetched);
        if (!responseValidityCheck[0]) {
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
      },
      err => {
        this.resultJsonSub.next({"responseStatus": "Error", "responseContent": "Network Connectivity Issues" });
      });
  }

  private isFetchedResponseValid(jsonObj) {
    let errMsg = 'No Error';
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
