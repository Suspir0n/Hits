import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }
  openTabsCentral(){
    this.navCtrl.navigateRoot("home");
  }
  openSignUp(){
    this.navCtrl.navigateRoot("sign-up");
  }

}
