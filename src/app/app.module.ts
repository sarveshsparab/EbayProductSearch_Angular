import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProdFormComponent } from './prod-form/prod-form.component';
import { CatToValPipe } from './pipes/cat-to-val.pipe';
import { IsEmptyDirective } from './directives/is-empty.directive';
import { IsZipValidDirective } from './directives/is-zip-valid.directive';

@NgModule({
  declarations: [
    AppComponent,
    ProdFormComponent,
    CatToValPipe,
    IsEmptyDirective,
    IsZipValidDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
