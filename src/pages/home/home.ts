import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { LoadingProvider } from '../../providers/loading/loading';
import { ToastProvider } from '../../providers/toast/toast';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public eachUser: any = {};

  public profileImage: any;
  public enableShow = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dataProvider: DataProvider,
    public loading: LoadingProvider,
    public toast: ToastProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.dataProvider.getCurrentUser().snapshotChanges().subscribe((account) => {
      this.loading.hide();
      this.eachUser = account.payload.val();
      this.profileImage = this.eachUser.img;
      this.enableShow = true;
      console.log(this.eachUser);
      console.log(this.profileImage);
    })
  }

  gotoAddSupplier() {
    this.navCtrl.push('SupplierAddPage');
  }

  gotoSupplierList() {
    this.navCtrl.push('SupplierListPage');
  }

  gotoMyProfile() {
    this.navCtrl.push('MyProfilePage');
  }

  gotoProductList() {
    this.navCtrl.push('ProductListPage');
  }

}
