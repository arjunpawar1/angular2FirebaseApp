import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router,ActivatedRoute,Params} from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.css']
})
export class EditListingComponent implements OnInit {
id:any;
listing :any;
title:any;
city:any;
owner:any;
bedrooms:any;
type:any;
price:any;
  constructor(private  firebaseService:FirebaseService, private router:Router, private route:ActivatedRoute) { 
  //to get the id frmo the clicked listing
this.id = this.route.snapshot.params['id'];
this.listing = this.firebaseService.getListingsDetails(this.id).subscribe(listings=>{
this.title  = listings.title;
this.city=listings.city;
this.bedrooms = listings.bedrooms;
this.type = listings.type;
this.owner = listings.owner;
this.price = listings.price;
})
    
  }

  onEditSubmit()
{
let listing={
  id:this.id,
  title :this.title,
  city:this.city,
  bedrooms:this.bedrooms,
  type:this.type,
  owner:this.owner,
  price:this.price
}

this.firebaseService.editListing(listing);
this.router.navigate(['/listings']);

}

  ngOnInit() {}



}
