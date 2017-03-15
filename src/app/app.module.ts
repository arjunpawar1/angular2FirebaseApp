import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule,Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ListingsComponent } from './components/listings/listings.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListingComponent } from './components/listing/listing.component';
import { AddListingComponent } from './components/add-listing/add-listing.component';
import { EditListingComponent } from './components/edit-listing/edit-listing.component';
import { AngularFireModule ,AuthProviders, AuthMethods} from 'angularfire2';
import {FirebaseService} from './services/firebase.service';
import{FlashMessagesModule} from 'angular2-flash-messages';
// Must export the config
export const firebaseConfig = {
 apiKey: "AIzaSyCE3uIBMQMx1F7s0v-ftrmwCpaR47AL6dc",
    authDomain: "proplistings-fa85d.firebaseapp.com",
    databaseURL: "https://proplistings-fa85d.firebaseio.com",
    storageBucket: "proplistings-fa85d.appspot.com",
    messagingSenderId: "528555910961"
};

const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup
};

const appRoutes: Routes = [
  {path:'',component:HomeComponent},
  {path:'listings',component:ListingsComponent},
  {path:'add-listing',component:AddListingComponent},
  {path:'listing/:id',component:ListingComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListingsComponent,
    NavbarComponent,
    ListingComponent,
    AddListingComponent,
    EditListingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig,firebaseAuthConfig),
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule
    
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
