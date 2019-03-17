import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ProductForm } from './prod-form';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Validators } from '@angular/forms';
import { ProdSearchService } from '../services/prod-search.service';
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
  fetchedZips: Observable<string[]>;

  constructor(private pss: ProdSearchService, private cdRef: ChangeDetectorRef) { }

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
      this.pss.fetchZipFromIPAPI().subscribe(data => {
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
  getZipCodeOnChange(event, psCustZip) {
    this.pForm.custZipCode = (document.getElementById('psCustZip') as HTMLInputElement).value;
  }
  ngOnInit() {
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
    return this.options.filter(option => option.toLowerCase().startsWith(filterValue));
  }

}
