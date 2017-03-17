import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';
import {RouterModule, Router} from '@angular/router';

@Injectable()
export class FirebaseService {
 listings: FirebaseListObservable<any[]>;
 listing:FirebaseObjectObservable<any>;
 listingPath:FirebaseObjectObservable<any>;
folder:any;
  constructor(private af:AngularFire, private router:Router) {
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


editListing(listings)
{
console.log('edit listing');
console.log(listings);
let storageRef  =firebase.storage().ref();
this.listingPath = this.af.database.object('https://proplistings-fa85d.firebaseio.com/listings/'+listings.$key);
console.log(this.listingPath);
this.listingPath.set({
    bedrooms:listings.bedrooms,
    title:listings.title,
    price:listings.price,
    type:listings.type,
    city:listings.city,
    image:'new_mansion.jpg',
    path:'/listingimages/new_mansion.jpg',
    owner:listings.owner
}).then((res)=>{
  console.log('updated');
  console.log(res);
});
this.router.navigate(['/listings']);
}


  deleteListing(listing)
  {
    let storageRef = firebase.storage().ref();
    let spaceRef = storageRef.child(listing.path);
    this.listingPath = this.af.database.object('https://proplistings-fa85d.firebaseio.com/listings/'+listing.$key);
//for deleting object/ listing based on id
    this.listingPath.remove().then(()=>{
      console.log('Deleted '+listing.$key);
    })

// for deleting the image
  storageRef.child(listing.path).delete().then((success)=>{
  console.log('Success '+success);
  }).catch((err)=>{
    console.log('Error: '+err);
  });

    this.router.navigate(['/listings']);
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