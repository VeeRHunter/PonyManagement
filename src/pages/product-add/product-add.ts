import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform, ModalController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { DataProvider } from '../../providers/data/data';
import { LoadingProvider } from '../../providers/loading/loading';
import { ToastProvider } from '../../providers/toast/toast';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the ProductAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-add',
  templateUrl: 'product-add.html',
})
export class ProductAddPage {

  public productData = {
    "productname": "",
    "companyname": "",
    "type": "",
    "year": "",
    "quantity": "",
    "price": "",
    "image": ""
  };

  public clickSignUp = false;
  public eachUser: any = {};

  public supList: any[];

  public yearList: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public serviceProvider: ServiceProvider,
    public dataProvider: DataProvider,
    public loading: LoadingProvider,
    public toast: ToastProvider,
    public camera: Camera,
    public actionsheetCtrl: ActionSheetController,
    public platform: Platform,
    public modalCtrl: ModalController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductAddPage');
    this.serviceProvider.setNavController(this.navCtrl);
    this.initialIonic();
  }

  initialIonic() {
    const current_year = new Date().getFullYear();

    this.yearList = new Array();

    for (let i = current_year; i > 1900; i--) {
      this.yearList.push(i);
    }

    this.productData.companyname = localStorage.getItem('companyName');

  }

  addProduct(supplierData) {
    this.clickSignUp = true;
    if (supplierData.valid) {
      console.log(supplierData.valid);
      // if (supplierData.valid && this.productData.image != "") {
      this.serviceProvider.productAdd(this.productData);
    }
  }

  clickAdd() {
    document.getElementById('add_supplier').click();
  }

  gotoHome() {
    this.navCtrl.push('HomePage');
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
          this.productData.image = data;
          this.loading.hide();
        } else {
          this.loading.hide();
        }
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
          this.productData.image = data;
          this.loading.hide();
        } else {
          this.loading.hide();
        }
      });
      profileModal.present();
    }, (err) => {
      // Handle error
      console.log("unselect image");
      this.loading.hide();
    });
  }

}
