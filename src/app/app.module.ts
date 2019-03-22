import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatRippleModule} from '@angular/material';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { AppComponent } from './app.component';
import { ProdFormComponent } from './components/prod-form/prod-form.component';
import { CatToValPipe } from './pipes/cat-to-val.pipe';
import { IsEmptyDirective } from './directives/is-empty.directive';
import { IsZipValidDirective } from './directives/is-zip-valid.directive';
import { DisableZipCodeDirective } from './directives/disable-zip-code.directive';
import { ProdResultsComponent } from './components/prod-results/prod-results.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { SearchListingComponent } from './components/search-listing/search-listing.component';

@NgModule({
  declarations: [
    AppComponent,
    ProdFormComponent,
    CatToValPipe,
    IsEmptyDirective,
    IsZipValidDirective,
    DisableZipCodeDirective,
    ProdResultsComponent,
    ItemDetailsComponent,
    WishListComponent,
    SearchListingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    NgbModule
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
