import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { SharedModule } from './shared/shared.module';

import { ProductModule } from './product/product.module';
import { ProductListComponent} from './product/product-list/product-list.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {FlexLayoutModule} from '@angular/flex-layout';

import { AngularFireModule} from '@angular/fire';
import {environment} from 'src/environments/environment';
import { AngularFireDatabaseModule} from '@angular/fire/database';
import { AngularFireAuthModule} from '@angular/fire/auth';
 
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    SharedModule, 
    ProductModule,
    AppRoutingModule,
    NgbModule,
    BsDropdownModule.forRoot(),
    BrowserModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
