import { PouchDBUserService } from './../../../services/pouch-dbuser.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  user: any = {
    id: '',
    username: '',
    phone: '',
    email: '',
    password: ''
  }

  constructor(
    private navCtrl: NavController,
    private pouchDBUser: PouchDBUserService
  ) { }

  ngOnInit() {
    this.sendUser(this.user);
  }
  openSignIn(){
    this.navCtrl.navigateRoot("sign-in");
  }
  sendUser(user){
    user._id = Math.random().toString(36).substr(2, 9);

    this.pouchDBUser.insertUserPouchDB(user).then(() => {
      this.user = {
        id: '',
        username: '',
        phone: '',
        email: '',
        password: ''
      }
      this.ngOnInit();
      this.navCtrl.navigateRoot("home");
    }).cath((err) => {
      console.log('An error has occurred', err);
    })
  }

}
