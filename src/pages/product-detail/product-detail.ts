import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform, ModalController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { DataProvider } from '../../providers/data/data';
import { LoadingProvider } from '../../providers/loading/loading';
import { ToastProvider } from '../../providers/toast/toast';
import { AuthProvider } from '../../providers/auth/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the ProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

  public productData: any = {};

  public eachUser: any = {};

  public enableShow = false;

  public typeState = true;
  public yearState = true;
  public quantityState = true;
  public priceState = true;

  public yearList: any[];

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
    console.log('ionViewDidLoad ProductDetailPage');
    this.getProductData();
  }

  getProductData() {
    const current_year = new Date().getFullYear();

    this.yearList = new Array();

    for (let i = current_year; i > 1900; i--) {
      this.yearList.push(i);
    }
    if (localStorage.getItem("product") != "" && typeof (localStorage.getItem("product")) != "undefined") {
      this.dataProvider.getProductWithProduc(localStorage.getItem("product")).snapshotChanges().subscribe((result) => {
        console.log(localStorage.getItem("product"));
        this.eachUser = result.payload.val();
        this.productData = this.eachUser;
        this.enableShow = true;
        this.loading.hide();
        console.log(this.productData);
      });
    }
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
    this.firebaseProvider.uploadPhoto(this.productData.userId, this.productData.product, image).then((url) => {
      let profileURL = url;
      this.productData.img = profileURL;
      console.log(profileURL);
      this.firebaseProvider.updateProImage(this.productData.product, profileURL);
      console.log(this.productData.img);
      this.loading.hide();
    });
  }

  editType() {
    this.typeState = false;
  }

  changeType() {
    this.typeState = true;
    this.firebaseProvider.updateProType(this.productData.product, this.productData.type);
  }

  editYear() {
    this.yearState = false;
  }

  changeYear() {
    this.yearState = true;
    this.firebaseProvider.updateProYear(this.productData.product, this.productData.year);
  }

  editQuantity() {
    this.quantityState = false;
  }

  changeQuantity() {
    this.quantityState = true;
    this.firebaseProvider.updateProQuantity(this.productData.product, this.productData.quantity);
  }

  editPrice() {
    this.priceState = false;
  }

  changePrice() {
    this.priceState = true;
    this.firebaseProvider.updateProPrice(this.productData.product, this.productData.price);
  }

  clickBack() {
    this.navCtrl.pop();
  }

  gotoHome() {
    this.navCtrl.push('HomePage');
  }

  delete() {
    this.enableShow = false;
    // localStorage.setItem('product', "");
    this.firebaseProvider.deleteProItem(this.productData.product);
    this.navCtrl.setRoot('HomePage');
  }

}
