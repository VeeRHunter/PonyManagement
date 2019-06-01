import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform, ModalController, ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DataProvider } from '../../providers/data/data';
import { LoadingProvider } from '../../providers/loading/loading';
import { FormControl, Validators } from '@angular/forms';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { ToastProvider } from '../../providers/toast/toast';

/**
 * Generated class for the SupplierAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-supplier-add',
  templateUrl: 'supplier-add.html',
})
export class SupplierAddPage {

  public userData = { "companyname": "", "name": "", "surname": "", "phonenumber": "", "image": "" };

  public clickSignUp = false;
  public eachUser: any = {};

  public supList: any[];

  public phoneControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]{1,20}$')
  ]);


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
    console.log('ionViewDidLoad SupplierAddPage');
    this.serviceProvider.setNavController(this.navCtrl);
    this.getSupplierList();
  }

  getSupplierList() {
    this.dataProvider.getSupplierList().snapshotChanges().subscribe((supllierList) => {
      this.eachUser = supllierList.payload.val();
      console.log(this.eachUser);
      this.supList = new Array();
      for (var key in this.eachUser) {
        console.log(this.eachUser[key]);
        this.supList.push(this.eachUser[key]);
      }
      console.log(this.supList);
      this.loading.hide();
    });
  }

  addSupplier(supplierData) {
    console.log(this.checkCompanyName());
    this.clickSignUp = true;
    if (this.checkCompanyName()) {
      // if (supplierData.valid && this.phoneControl.valid) {
      if (supplierData.valid && this.userData.image != "" && this.phoneControl.valid) {
        this.serviceProvider.supplierAdd(this.userData);
      }
    } else {
      this.toast.show('Company name already exist, please input another company name');
    }
  }

  checkCompanyName() {
    let enable = true;
    for (let list of this.supList) {
      if (this.userData.companyname == list.companyname) {
        enable = false;
      }
    }
    return enable;
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
      this.userData.image = base64Image;
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
      this.userData.image = base64Image;
      this.loading.hide();
    }, (err) => {
      // Handle error
      console.log("unselect image");
      this.loading.hide();
    });
  }


}
