import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProdSearchService {

  constructor(private http: HttpClient) { }

  search(psForm) {
    console.log(psForm);
  }

  fetchZipFromIPAPI() {
    const url = 'http://ip-api.com/json';
    return this.http.get(url);
  }

  pssClear() {
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxx');
  }
}
