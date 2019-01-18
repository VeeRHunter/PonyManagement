import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import 'rxjs/add/operator/take';
import { ToastProvider } from '../toast/toast';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  constructor(
    public toast: ToastProvider,
  ) {
    console.log('Hello FirebaseProvider Provider');
  }

  setOnlineState() {
    firebase.database().ref('accounts/' + firebase.auth().currentUser.uid).update({ 'state': "Online" });
  }

  setOfflineState() {
    firebase.database().ref('accounts/' + firebase.auth().currentUser.uid).update({ 'state': "Offline" });
  }

  updateUserName(updatedUserName) {
    firebase.database().ref('accounts/' + firebase.auth().currentUser.uid).update({ 'username': updatedUserName });
  }

  updateSurName(updatedSurName) {
    firebase.database().ref('accounts/' + firebase.auth().currentUser.uid).update({ 'surname': updatedSurName });
  }

  updatePhoneNumber(updatedPhoneNumber) {
    firebase.database().ref('accounts/' + firebase.auth().currentUser.uid).update({ 'phonenumber': updatedPhoneNumber });
  }

  updateProfilePicture(updatedProfilePicture) {
    firebase.database().ref('accounts/' + firebase.auth().currentUser.uid).update({ 'img': updatedProfilePicture });
  }

  uploadPhoto(currentUserID, phptoType, imageData): Promise<any> {
    return new Promise(resolve => {
      // Get picture from camera or gallery.
      // Process the returned imageURI.
      let imgBlob = this.imgURItoBlob(imageData);
      let metadata = {
        'contentType': imgBlob.type
      };
      // Generate filename and upload to Firebase Storage.
      firebase.storage().ref().child('images/' + currentUserID + '/' + phptoType + '/' + 'profile.jpg').put(imgBlob, metadata).then((snapshot) => {
        console.log(snapshot);
        firebase.storage().ref().child(snapshot.metadata.fullPath).getDownloadURL().then((result) => {
          resolve(result);
        }, err => {
          console.log(err);
        })
        // URL of the uploaded image!
      }).catch((error) => {
        console.log(error);
        this.toast.show('image/error-image-upload');
      });
    });
  }

  // Function to convert dataURI to Blob needed by Firebase
  imgURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type: mimeString
    });
  }

  generateFilename() {
    var length = 8;
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text + ".jpg";
  }

  updateSupName(companyname, supName) {
    firebase.database().ref('supplier/' + companyname).update({ 'name': supName });
  }

  updateSupSurName(companyname, supSurname) {
    firebase.database().ref('supplier/' + companyname).update({ 'surname': supSurname });
  }

  updateSupPhoneNumber(companyname, phonenumber) {
    firebase.database().ref('supplier/' + companyname).update({ 'phonenumber': phonenumber });
  }

  updateSupPicture(companyname, imageURL) {
    firebase.database().ref('supplier/' + companyname).update({ 'img': imageURL });
  }

  updateProType(product, proType) {
    firebase.database().ref('product/' + product).update({ 'type': proType });
  }

  updateProYear(product, proYear) {
    firebase.database().ref('product/' + product).update({ 'year': proYear });
  }

  updateProQuantity(product, proQuantity) {
    firebase.database().ref('product/' + product).update({ 'quantity': proQuantity });
  }

  updateProPrice(product, proPrice) {
    firebase.database().ref('product/' + product).update({ 'price': proPrice });
  }

  updateProImage(product, proImage) {
    firebase.database().ref('product/' + product).update({ 'img': proImage });
  }

}
