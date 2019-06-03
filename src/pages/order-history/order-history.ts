import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the OrderHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-history',
  templateUrl: 'order-history.html',
})
export class OrderHistoryPage {

  public eachUser: any = {};
  public orderData: any = {};

  public orderHistoryData = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loading: LoadingProvider,
    public dataProvider: DataProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderHistoryPage');
    this.getOrderHistory();
  }

  getOrderHistory() {
    this.dataProvider.getOrderHistory().snapshotChanges().subscribe((supplierList) => {
      this.orderData = supplierList.payload.val();
      this.orderHistoryData = new Array();
      for (var list in this.orderData) {
        this.orderHistoryData.push(this.orderData[list]);
      }
      console.log(this.orderHistoryData);
      this.loading.hide();
    });
  }

  gotoHome() {
    this.navCtrl.setRoot('HomePage');
  }

  viewOrderDetail(index) {
    this.navCtrl.push('OrderReviewPage', { orderData: this.orderHistoryData[index] });
  }

}
