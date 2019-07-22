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

    let dateCreated = new Date();
    firebase.database().ref('supplier/' + supllierData.companyname).set({
      dateCreated,
      companyname: supllierData.companyname,
      name: supllierData.name,
      surname: supllierData.surname,
      userId: user.uid,
      phonenumber: supllierData.phonenumber,
      img: 'profileURL'
    });
    this.loading.hide();
    this.navCtrl.push('SupplierAddedPage');
  }

  productAdd(productData) {

    this.loading.show();

    let user = firebase.auth().currentUser;

    let dateCreated = new Date();


    firebase.database().ref('product/' + productData.productname + dateCreated.getTime()).set({
      dateCreated,
      product: productData.productname + dateCreated.getTime(),
      productname: productData.productname,
      type: productData.type,
      year: productData.year,
      companyname: productData.companyname,
      userId: user.uid,
      quantity: productData.quantity,
      price: productData.price,
      img: 'profileURL'
    });
    this.loading.hide();
    this.navCtrl.push('ProductAddedPage');

  }

  orderHistoryAdd(orderData) {

    this.loading.show();

    let user = firebase.auth().currentUser;

    let dateCreated = new Date();

    firebase.database().ref('orderHistory/' + orderData.companyname + dateCreated.getTime()).set({
      product: orderData.companyname + dateCreated.getTime(),
      orderIndex: dateCreated.getTime(),
      companyname: orderData.companyname,
      dateCreated: orderData.date,
      userId: user.uid,
      itemsnumber: orderData.itemsnumber,
      itemsprice: orderData.itemsprice,
      productList: orderData.productList
    });
    this.loading.hide();
    this.navCtrl.push('PurchasePage');

  }

  orderProduct(orderList) {
    this.loading.show();
    let user = firebase.auth().currentUser;
    let dateCreated = new Date();
    firebase.database().ref('order/' + user.uid + '/' + dateCreated.getTime()).set({
      orderList
    });
    this.loading.hide();
    this.navCtrl.push('HomePage');
  }



}
