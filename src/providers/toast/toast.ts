import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the ToastProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToastProvider {

  public toast;

  constructor(
    public toastCtrl: ToastController,
  ) {
    console.log('Hello ToastProvider Provider');
  }

  show(toastMessage) {
    this.toast = this.toastCtrl.create({
      message: toastMessage,
      duration: 3000
    });
    this.toast.present();
  }

}
