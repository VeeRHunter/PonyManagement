import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform, ModalController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { DataProvider } from '../../providers/data/data';
import { LoadingProvider } from '../../providers/loading/loading';
import { ToastProvider } from '../../providers/toast/toast';
import { AuthProvider } from '../../providers/auth/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormControl, Validators } from '@angular/forms';

/**
 * Generated class for the SupplierDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-supplier-detail',
  templateUrl: 'supplier-detail.html',
})
export class SupplierDetailPage {

  public supplierData: any = {};

  public eachUser: any = {};

  public enableShow = false;

  public nameState = true;
  public surnameState = true;
  public phoneState = true;

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
    console.log('ionViewDidLoad SupplierDetailPage');
    // this.supplierData = this.navParams.get('supplierData');
    this.getSupplierData();
  }

  getSupplierData() {
    this.loading.show();
    let companyName = localStorage.getItem('companyName');
    this.dataProvider.getSupplierWithCompanyName(companyName).snapshotChanges().subscribe(
      (supData) => {
        this.eachUser = supData.payload.val();
        this.supplierData = this.eachUser;
        this.enableShow = true;
        console.log(this.eachUser);
        this.loading.hide();
      }, (error) => {
        this.loading.hide();
      });
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
      let profileModal = this.modalCtrl.create('PhotoCropPage', { photo: base64Image });
      profileModal.onDidDismiss(data => {
        console.log("data");
        if (data != null && typeof (data) != "undefined") {
          // this.supplierData.img = data;
          console.log("this.supplierData.img");
          this.updatePhoto(data);
        }
        this.loading.hide();
      });
      profileModal.present();

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
          // this.loading.hide();
          this.updatePhoto(data);
        }
        this.loading.hide();
      });
      profileModal.present();
    }, (err) => {
      // Handle error
      console.log("unselect image");
      this.loading.hide();
    });
  }

  updatePhoto(image) {
    this.firebaseProvider.uploadPhoto(this.supplierData.userId, image).then((url) => {
      let profileURL = url;
      this.supplierData.img = profileURL;
      console.log(profileURL);
      this.firebaseProvider.updateSupPicture(this.supplierData.companyname, profileURL);
      console.log(this.supplierData.img);
      this.loading.hide();
    });
  }

  editName() {
    this.nameState = false;
  }

  changeName() {
    this.firebaseProvider.updateSupName(this.supplierData.companyname, this.supplierData.username);
    this.nameState = true;
  }

  editSurname() {
    this.surnameState = false;
  }

  changeSurname() {
    this.firebaseProvider.updateSupSurName(this.supplierData.companyname, this.supplierData.surname);
    this.surnameState = true;
  }

  editPhone() {
    this.phoneState = false;
  }

  changePhone() {
    this.firebaseProvider.updateSupPhoneNumber(this.supplierData.companyname, this.supplierData.phonenumber);
    this.phoneState = true;
  }

  logout() {
    this.authProvider.logout();
  }

  addProduct() {

  }

  seeProduct() {

  }

}
