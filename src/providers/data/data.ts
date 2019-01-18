
import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoadingProvider } from '../loading/loading';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  constructor(
    public angularfire: AngularFireDatabase,
    public loading: LoadingProvider,
  ) {
    console.log('Hello DataProvider Provider');
  }

  // Get all users
  getUsers() {
    this.loading.hide();
    this.loading.show();
    return this.angularfire.list('/accounts', ref => ref.orderByChild('name'));
  }

  // Get user with username
  getUserWithUsername(username) {
    this.loading.hide();
    this.loading.show();
    return this.angularfire.list('/accounts', ref => ref.orderByChild('username').equalTo(username));
  }

  // Get logged in user data
  getCurrentUser() {
    this.loading.hide();
    this.loading.show();
    return this.angularfire.object('/accounts/' + firebase.auth().currentUser.uid);
  }

  // Get user by their userId
  getUser(userId) {
    this.loading.hide();
    this.loading.show();
    return this.angularfire.object('/accounts/' + userId);
  }

  // Get supplier list
  getSupplierList() {
    this.loading.hide();
    this.loading.show();
    return this.angularfire.object('/supplier/');
  }

  getSupplierWithCompanyName(companyName) {
    this.loading.hide();
    this.loading.show();
    return this.angularfire.object('/supplier/' + companyName);
  }

  // Get Product list
  getProductList() {
    if (this.loading.loading) {

    } else {
      this.loading.hide();
      this.loading.show();
    }
    return this.angularfire.object('/product/');
  }

  getProductWithProduc(product) {
    this.loading.hide();
    this.loading.show();
    return this.angularfire.object('/product/' + product);
  }


}
