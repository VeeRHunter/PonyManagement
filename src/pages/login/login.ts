import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FormControl, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public emailFormControl = new FormControl('', [
    Validators.email,
    Validators.required
  ]);

  public userData = { "email": "", "password": "" };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public authProvider: AuthProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.authProvider.setNavController(this.navCtrl);
  }

  Login(userProfile) {
    if (userProfile.valid && this.emailFormControl.valid) {
      this.authProvider.emailLogin(this.userData.email, this.userData.password);
      // this.navCtrl.push('HomePage');
    }
  }

  gotoSignup() {
    // this.navCtrl.push('SignupPage');
  }

  forgotPassword() {
    // this.navCtrl.push('ForgotPasswordPage');
  }

}
