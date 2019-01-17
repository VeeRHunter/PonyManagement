import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import { LoadingProvider } from '../loading/loading';
import { ToastProvider } from '../toast/toast';
import { NavController } from 'ionic-angular';
import { FirebaseProvider } from '../firebase/firebase';

/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {

  public navCtrl: NavController;

  constructor(
    public loading: LoadingProvider,
    public toast: ToastProvider,
    public firebaseProvider: FirebaseProvider,
  ) {
    console.log('Hello ServiceProvider Provider');
  }

  setNavController(navCtrl) {
    this.navCtrl = navCtrl;
  }

  supplierAdd(supllierData) {

    this.loading.show();

    let user = firebase.auth().currentUser;

    this.firebaseProvider.uploadPhoto(user.uid, supllierData.image).then((url) => {
      let profileURL = url;

      let dateCreated = new Date();
      firebase.database().ref('supplier/' + supllierData.companyname).set({
        dateCreated,
        companyname: supllierData.companyname,
        username: supllierData.name,
        surname: supllierData.surname,
        userId: user.uid,
        phonenumber: supllierData.phonenumber,
        img: profileURL
      });
      this.loading.hide();
      this.navCtrl.push('SupplierAddedPage');

    });
  }


}
