import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ProductForm } from './prod-form';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Validators } from '@angular/forms';
import { ProdSearchService } from '../../services/prod-search.service';
import { ZipAutoCompleteService } from '../../services/zip-auto-complete.service';
import { IPAPIService } from '../../services/ipapi.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-prod-form',
  templateUrl: './prod-form.component.html',
  styleUrls: ['./prod-form.component.css']
})
export class ProdFormComponent implements OnInit {

  zipCode = '';
  isZipCodeFetched = false;
  zipCodeType = 'curr';
  category = -1;

  zipAutoCompleteControl = new FormControl('', Validators.required);
  options: string[] = ['One', 'Two', 'Three'];
  zipOptions: string[];
  fetchedZips: Observable<string[]>;

  constructor(private pss: ProdSearchService, private cdRef: ChangeDetectorRef, private zacs: ZipAutoCompleteService,
              private ipapis: IPAPIService) { }

  pForm = ProductForm;

  categoryTypes = [
    'All Categories',
    'Art',
    'Baby',
    'Books',
    'Clothing, Shoes & Accessories',
    'Computers/Tablets & Networking',
    'Health & Beauty',
    'Music',
    'Video Games & Consoles'
  ];

  psSubmit() {
    this.pss.search(this.pForm);
  }
  fetchCurrentZipCode() {
      this.ipapis.fetchZipFromIPAPI().subscribe(data => {
        this.zipCode = data['zip'];
        this.pForm.currZipCode = this.zipCode;
        this.isZipCodeFetched = true;
    });
  }
  clearPSForm() {
    this.pss.pssClear();
    this.zipCode = '';
    this.zipCodeType = 'curr';
    this.category = -1;
  }
  // getZipCodeOnChange(event, psCustZip) {
  //   this.pForm.custZipCode = (document.getElementById('psCustZip') as HTMLInputElement).value;
  // }
  ngOnInit() {
    this.zipOptions = [];
    this.fetchCurrentZipCode();

    this.fetchedZips = this.zipAutoCompleteControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filterZips(value))
      );
  }

  private filterZips(value: string): string[] {
    if (value === '') {
      return null;
    }
    const filterValue = value.toLowerCase();
    this.zacs.fetchResponseFromGeoName(value).subscribe(data => {
      this.zipOptions = [];
      data['postalCodes'].forEach(element => {
        this.zipOptions.push(element.postalCode);
      });
      console.log(this.zipOptions);
    });
    return this.zipOptions.filter(option => option.toLowerCase().startsWith(filterValue));
  }

}
