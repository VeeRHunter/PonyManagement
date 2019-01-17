import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FormControl, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {

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
    console.log('ionViewDidLoad ForgotPasswordPage');
    this.authProvider.setNavController(this.navCtrl);
  }

  sendRequest(userProfile) {
    if (userProfile.valid && this.emailFormControl.valid) {
      this.authProvider.sendPasswordReset(this.userData.email);
      // this.navCtrl.push('HomePage');
    }
  }

}
