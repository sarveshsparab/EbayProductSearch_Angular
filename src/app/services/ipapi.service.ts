import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class IPAPIService {

  constructor(private http: HttpClient) { }

  fetchZipFromIPAPI() {
    const url = 'http://ip-api.com/json';
    return this.http.get(url);
  }
}
