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

  updatePhoneNumber(updatedPhoneNumber) {
    firebase.database().ref('accounts/' + firebase.auth().currentUser.uid).update({ 'phonenumber': updatedPhoneNumber });
  }

  updateProfilePicture(updatedProfilePicture) {
    firebase.database().ref('accounts/' + firebase.auth().currentUser.uid).update({ 'img': updatedProfilePicture });
  }

  uploadPhoto(currentUserID, imageData): Promise<any> {
    return new Promise(resolve => {
      // Get picture from camera or gallery.
      // Process the returned imageURI.
      let imgBlob = this.imgURItoBlob(imageData);
      let metadata = {
        'contentType': imgBlob.type
      };
      // Generate filename and upload to Firebase Storage.
      firebase.storage().ref().child('images/' + currentUserID + '/' + this.generateFilename()).put(imgBlob, metadata).then((snapshot) => {
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

}
