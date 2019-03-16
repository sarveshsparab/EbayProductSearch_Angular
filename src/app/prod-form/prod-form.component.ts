import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ProductForm } from './prod-form';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { ProdSearchService } from '../services/prod-search.service';

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
  }

}
