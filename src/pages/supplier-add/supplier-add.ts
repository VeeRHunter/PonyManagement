import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupplierAddPage');
  }

  addSupplier(supplierData) {
    if (supplierData.valid) {
      this.navCtrl.push('SupplierAddedPage');
    }
  }

  clickAdd() {
    document.getElementById('add_supplier').click();
  }

  gotoHome() {
    this.navCtrl.push('HomePage');
  }

}
