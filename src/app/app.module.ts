import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProdFormComponent } from './prod-form/prod-form.component';
import { CatToValPipe } from './pipes/cat-to-val.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProdFormComponent,
    CatToValPipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
