
import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  constructor(
    public angularfire: AngularFireDatabase,
  ) {
    console.log('Hello DataProvider Provider');
  }

  // Get all users
  getUsers() {
    return this.angularfire.list('/accounts', ref => ref.orderByChild('name'));
  }

  // Get user with username
  getUserWithUsername(username) {
    return this.angularfire.list('/accounts', ref => ref.orderByChild('username').equalTo(username));
  }

  // Get logged in user data
  getCurrentUser() {
    return this.angularfire.object('/accounts/' + firebase.auth().currentUser.uid);
  }

  // Get user by their userId
  getUser(userId) {
    return this.angularfire.object('/accounts/' + userId);
  }

  // Get supplier list
  getSupplierList() {
    return this.angularfire.object('/supplier/');
  }
  
  getSupplierWithCompanyName(companyName) {
    return this.angularfire.object('/supplier/' + companyName);
  }


}
