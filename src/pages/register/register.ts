import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform, ModalController } from 'ionic-angular';
import { FormControl, Validators } from '@angular/forms';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { LoadingProvider } from '../../providers/loading/loading';
import { ToastProvider } from '../../providers/toast/toast';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public emailFormControl = new FormControl('', [
    Validators.email,
    Validators.required
  ]);

  public rePasswordControl = new FormControl('', [
    Validators.required
  ]);


  public userData = { "username": "", "email": "", "phonenumber": "", "profileImage": "", "password": "", "confirmpassword": "" };

  public clickSignUp = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public camera: Camera,
    public actionsheetCtrl: ActionSheetController,
    public platform: Platform,
    public modalCtrl: ModalController,
    public loading: LoadingProvider,
    public toast: ToastProvider,
    public authProvider: AuthProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    this.authProvider.setNavController(this.navCtrl);
  }

  signUpUser(userProfile) {
    this.clickSignUp = true;
    if (userProfile.valid && this.emailFormControl.valid && this.rePasswordControl.valid
      && this.userData.password == this.userData.confirmpassword) {
      // && this.userData.profileImage != "") {
      this.authProvider.signUpUser(this.userData);
    }
  }

  uploadPicture() {

    let actionSheet = this.actionsheetCtrl.create({
      title: 'Option',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Take photo',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'ios-camera-outline' : null,
          handler: () => {
            this.takePhoto();
          }
        },
        {
          text: 'Choose photo from Gallery',
          icon: !this.platform.is('ios') ? 'ios-images-outline' : null,
          handler: () => {
            this.openGallery();
          }
        },
      ]
    });
    actionSheet.present();
  }

  takePhoto() {

    setTimeout(() => {
      this.loading.show();
    }, 100);

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      let profileModal = this.modalCtrl.create('PhotoCropPage', { photo: base64Image });
      profileModal.onDidDismiss(data => {
        console.log(data);
        if (data != null && typeof (data) != "undefined") {
          this.userData.profileImage = data;
        } else {
        }
      });
      profileModal.present();
      this.loading.hide();

    }, (err) => {
      console.log("unselect image");
      this.loading.hide();
    });

  }

  openGallery() {

    setTimeout(() => {
      this.loading.show();
    }, 100);

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      let profileModal = this.modalCtrl.create('PhotoCropPage', { photo: base64Image });
      profileModal.onDidDismiss(data => {
        console.log(data);
        if (data != null && typeof (data) != "undefined") {
          this.userData.profileImage = data;
        }
      });
      profileModal.present();
      this.loading.hide();
    }, (err) => {
      // Handle error
      console.log("unselect image");
      this.loading.hide();
    });
  }

}
