import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ZipAutoCompleteService {
  private resultJsonSub = new Subject();
  resultJsonOb = this.resultJsonSub.asObservable();

  private jsonData: any;
  private zipOptions = [];

  constructor(private http: HttpClient) { }

  fetchResponseFromGeoName(start) {

    let params = new HttpParams()
      .set('startZip', start);

    //const url = 'http://api.geonames.org/postalCodeSearchJSON?postalcode_startsWith=' + start + '&username=sparab&country=US&maxRows=5';
    // const url = 'http://localhost:3000/zipAuto/' + params;
    const url = 'http://node-dot-csci-571-webtech-8.appspot.com/zipAuto/' + params;

    console.log("URL Hit for zip autocomplete : " + url);

    const response =  this.http.get(url);
    response.subscribe(
      data => {
        this.jsonData = data;
        this.resultJsonSub.next(this.jsonData);
        data['postalCodes'].forEach(element => {
          this.zipOptions.push(element.postalCode);
        });
      },
      err => {
        this.resultJsonSub.next(null);
      }
    );
  }

  loadResponseFromGeoName() {
    this.resultJsonSub.next(this.jsonData);
  }
}
