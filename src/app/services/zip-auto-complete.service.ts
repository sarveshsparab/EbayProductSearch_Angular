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
  private filteredZips: string[];

  constructor(private http: HttpClient) { }

  fetchResponseFromGeoName(start) {
    const url = 'http://api.geonames.org/postalCodeSearchJSON?postalcode_startsWith=' + start + '&username=sparab&country=US&maxRows=5';
    return this.http.get(url);
  }
}
