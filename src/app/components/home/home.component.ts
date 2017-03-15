import { Component, OnInit } from '@angular/core';
import{AngularFire} from 'angularfire2';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public af: AngularFire,
  private flashMessage:FlashMessagesService) { }

  ngOnInit() {
  }
login()
{
  this.af.auth.login();
//   setTimeout(()=>{
// this.flashMessage.show('Welcome ',{cssClass:'alert-success',timeout:2000});
//   },5000)

}
}
