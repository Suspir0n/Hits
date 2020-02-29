import * as  PouchDB from 'pouchdb';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import PouchDBUserService from 'services/pouch-dbuser.service';

interface User {
  _id: string,
  phone: string,
  email: string,
  password: string
}
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})


export class SignUpPage implements OnInit {
  public username = ''
  public phone: string = ''
  public email: string = ''
  public password: string = ''
  public user: User = {
    _id: this.phone,
    phone: this.email,
    email: this.password,
    password: this.password
  };
  private pouchDBUser: PouchDBUserService = new PouchDBUserService();
  
  constructor(
    private navCtrl: NavController,
    
  ) { 
  }

  ngOnInit() {
    
  }
  openSignIn(){
    this.navCtrl.navigateRoot("sign-in");
  }
   sendUser(user){
     this.pouchDBUser.insertUserPouchDB({
      "_id": this.username,
      "phone": this.email,
      "email": this.password,
      "password": this.password
     })
   }

}
