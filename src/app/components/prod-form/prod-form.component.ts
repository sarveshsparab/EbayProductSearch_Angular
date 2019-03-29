import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ProductForm } from './prod-form';
import { Validators } from '@angular/forms';
import { ProdSearchService } from '../../services/prod-search.service';
import { ZipAutoCompleteService } from '../../services/zip-auto-complete.service';
import { IPAPIService } from '../../services/ipapi.service';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, map, startWith} from 'rxjs/operators';

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
  isZipAutoCompleteDisabled = true;

  zipAutoCompleteControl = new FormControl('', Validators.required);
  fetchedZips: string[];

  @Output() submitEvent = new EventEmitter<boolean>();

  constructor(private pss: ProdSearchService, private cdRef: ChangeDetectorRef, private zacs: ZipAutoCompleteService,
              private ipapis: IPAPIService) {
    this.zacs.resultJsonOb.pipe(
        debounceTime(300),
        distinctUntilChanged()
      ).subscribe(data => {
        this.fetchedZips = [];
        if (data === null) {
          this.isZipAutoCompleteDisabled = true;
        } else if (data === undefined) {
          this.isZipAutoCompleteDisabled = true;
        } else if (data['status'] === 'ZERO_RESULTS') {
          this.isZipAutoCompleteDisabled = true;
        } else {
          data['postalCodes'].forEach(element => {
            this.fetchedZips.push(element.postalCode);
          });
          console.log(this.fetchedZips);
          this.isZipAutoCompleteDisabled = false;
        }
    });
  }

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
    this.pForm.custZipCode = this.zipAutoCompleteControl.value;
    this.pss.fetchFromEbay(this.pForm);
    this.submitEvent.emit(true);
  }
  fetchNewZips(enteredValue) {
    this.zacs.fetchResponseFromGeoName(enteredValue);
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
    this.zipCodeType = 'curr';
    this.category = -1;
    this.isZipAutoCompleteDisabled = true;
  }
  ngOnInit() {
    this.fetchCurrentZipCode();
    this.zacs.loadResponseFromGeoName();
    this.zipAutoCompleteControl.disable();
  }

  zipRadioToggle() {
    if(this.pForm.zipCodeType=='cust'){
      this.zipAutoCompleteControl.enable();
    } else {
      this.zipAutoCompleteControl.disable();
    }
  }
}
