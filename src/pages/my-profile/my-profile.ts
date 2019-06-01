import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform, ModalController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { LoadingProvider } from '../../providers/loading/loading';
import { ToastProvider } from '../../providers/toast/toast';
import { AuthProvider } from '../../providers/auth/auth';
import { DataProvider } from '../../providers/data/data';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormControl, Validators } from '@angular/forms';

/**
 * Generated class for the MyProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfilePage {

  public userData = {
    "username": "Jake",
    "surname": "Johnson",
    "phonenumber": "041234567",
    "image": "assets/imgs/sample.jpg",
    "userAccountUID": "",
  };

  public eachUser: any = {};

  public nameState = true;
  public emailState = true;
  public phoneState = true;
  public imageState = true;

  public phoneControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]{1,20}$')
  ]);

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseProvider: FirebaseProvider,
    public dataProvider: DataProvider,
    public loading: LoadingProvider,
    public toast: ToastProvider,
    public authProvider: AuthProvider,
    public camera: Camera,
    public actionsheetCtrl: ActionSheetController,
    public platform: Platform,
    public modalCtrl: ModalController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProfilePage');
    this.loading.show();
    this.dataProvider.getCurrentUser().snapshotChanges().subscribe((account) => {
      this.loading.hide();
      this.eachUser = account.payload.val();
      this.userData.image = this.eachUser.img;
      this.userData.phonenumber = this.eachUser.phonenumber;
      this.userData.surname = this.eachUser.surname;
      this.userData.username = this.eachUser.username;
      this.userData.userAccountUID = this.eachUser.userId;
      console.log(this.eachUser);
    })
  }

  editUsername() {
    this.nameState = false;
  }

  changeUsername() {
    this.firebaseProvider.updateUserName(this.userData.username);
    this.nameState = true;
  }

  editSurname() {
    this.emailState = false;
  }

  changeSurname() {
    this.firebaseProvider.updateSurName(this.userData.surname);
    this.emailState = true;
  }

  editPhone() {
    this.phoneState = false;
  }

  changePhone() {
    this.phoneControl.setValue(this.userData.phonenumber);
    if (this.phoneControl.valid) {
      this.firebaseProvider.updatePhoneNumber(this.userData.phonenumber);
      this.phoneState = true;
    } else {
      this.toast.show("Please input valid Phone Number");
    }
  }

  gotoHome() {
    this.navCtrl.push('HomePage');
  }

  logout() {
    this.authProvider.logout();
  }

  changeProfilePicture() {

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
      
      this.updatePhoto(base64Image);

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
      
      
      this.updatePhoto(base64Image);
    }, (err) => {
      // Handle error
      console.log("unselect image");
      this.loading.hide();
    });
  }

  updatePhoto(image) {
    this.firebaseProvider.uploadPhoto(this.userData.userAccountUID, 'account', image).then((url) => {
      let profileURL = url;
      this.userData.image = profileURL;
      this.firebaseProvider.updateProfilePicture(profileURL);
      this.loading.hide();
    });
  }

}
