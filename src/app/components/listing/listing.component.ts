import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router,ActivatedRoute,Params} from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
id:any;
listing:any;
imageUrl:any;
  constructor(private  firebaseService:FirebaseService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
//Get ID
      this.id = this.route.snapshot.params['id'];
      this.firebaseService.getListingsDetails(this.id).subscribe(listing=>{
      this.listing = listing;
        //Storage Ref
      //getting image from Firebase
      let storageRef = firebase.storage().ref();
      let spaceRef = storageRef.child(listing.path);
      storageRef.child(listing.path).getDownloadURL().then((url)=>{
    //Set the Image imageUrl
    this.imageUrl = url;
}).catch((error)=>{
  console.log('Error: '+error);
});

    });
  }

deleteListing()
{
      this.firebaseService.deleteListing(this.listing);
}

}
