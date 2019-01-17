import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

/*
  Generated class for the LoadingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoadingProvider {

  public loading;

  constructor(
    public loadingCtrl: LoadingController
  ) {
    console.log('Hello LoadingProvider Provider');
  }

  show() {
    this.loading = this.loadingCtrl.create({
      content: "Please Wait..."
    });
    this.loading.present();
  }

  hide() {
    if (this.loading) {
      this.loading.dismiss();
      this.loading = null;
    }
  }

}
