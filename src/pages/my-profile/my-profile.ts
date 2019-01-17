import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { LoadingProvider } from '../../providers/loading/loading';
import { ToastProvider } from '../../providers/toast/toast';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the MyProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfilePage {

  public userData = { "username": "Jake", "email": "jakehappy@gmail.com", "phonenumber": "041234567", "image": "assets/imgs/sample.jpg" };

  public nameState = true;
  public emailState = true;
  public phoneState = true;
  public imageState = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseProvider: FirebaseProvider,
    public authProvider: AuthProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProfilePage');
  }

  editUsername() {
    this.nameState = false;
  }

  changeUsername() {

    this.nameState = true;
  }

  editEmail() {
    this.emailState = false;
  }

  changeEmail() {
    this.emailState = true;
  }

  editPhone() {
    this.phoneState = false;
  }

  changePhone() {
    this.phoneState = true;
  }

  gotoHome() {
    this.navCtrl.push('HomePage');
  }

  logout() {
    this.authProvider.logout();
  }

}
