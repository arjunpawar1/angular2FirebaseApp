import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {
 listings: FirebaseListObservable<any[]>;
 listing:FirebaseObjectObservable<any>;
folder:any;
  constructor(private af:AngularFire) {
    this.folder = 'listingimages';
   }

getListings()
{
 this.listings = this.af.database.list('/listings') as FirebaseListObservable<Listing[]>
 return this.listings;
  
}
getListingsDetails(id)
{
this.listing = this.af.database.object('/listings/'+id) as FirebaseObjectObservable<Listing>
return this.listing;
}

addListing(listing)
{
  //Create a Root Reference
  let storageRef = firebase.storage().ref();

  //loop over add-listing.component.html till you get to image tag with Id = image
  for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]){
    let path = `/${this.folder}/${selectedFile.name}`;
    let iRef = storageRef.child(path);
    iRef.put(selectedFile).then((snapshot)=>{
      //putting image key a value which we got (listing is what we are getting as a parameter)
      listing.image = selectedFile.name;
      listing.path = path;
      return this.listings.push(listing);
    });
  }
}
}

interface Listing{
  $key?: string;
  title?: string;
  type?:string
  image?:string;
  city?:string;
  owner?:string;
  bedrooms?:string;
}