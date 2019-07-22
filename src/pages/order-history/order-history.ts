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
      console.log(this.orderData);
      this.orderHistoryData = new Array();
      for (var list in this.orderData) {
        this.orderHistoryData.push(this.orderData[list]);
      }
      this.bubbleSortDecrease();
      console.log(this.orderHistoryData);
      this.loading.hide();
    });
  }


  bubbleSortIncrease() {
    let length = this.orderHistoryData.length;
    for (let i = 0; i < length; i++) { //Number of passes
      for (let j = 0; j < (length - i - 1); j++) { //Notice that j < (length - i)
        //Compare the adjacent positions
        if (parseFloat(this.orderHistoryData[j].orderIndex) > parseFloat(this.orderHistoryData[j + 1].orderIndex)) {
          //Swap the numbers
          let tmp = this.orderHistoryData[j];  //Temporary letiable to hold the current number
          this.orderHistoryData[j] = this.orderHistoryData[j + 1]; //Replace current number with adjacent number
          this.orderHistoryData[j + 1] = tmp; //Replace adjacent number with current number
        }
      }
    }
  }

  bubbleSortDecrease() {
    let length = this.orderHistoryData.length;
    for (let i = 0; i < length; i++) { //Number of passes
      for (let j = 0; j < (length - i - 1); j++) { //Notice that j < (length - i)
        //Compare the adjacent positions
        if (parseFloat(this.orderHistoryData[j].orderIndex) < parseFloat(this.orderHistoryData[j + 1].orderIndex)) {
          //Swap the numbers
          let tmp = this.orderHistoryData[j];  //Temporary letiable to hold the current number
          this.orderHistoryData[j] = this.orderHistoryData[j + 1]; //Replace current number with adjacent number
          this.orderHistoryData[j + 1] = tmp; //Replace adjacent number with current number
        }
      }
    }
  }

  gotoHome() {
    this.navCtrl.setRoot('HomePage');
  }

  viewOrderDetail(index) {
    this.navCtrl.push('OrderReviewPage', { orderData: this.orderHistoryData[index] });
  }

}
