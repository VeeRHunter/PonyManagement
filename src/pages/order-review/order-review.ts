import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading';
import { DataProvider } from '../../providers/data/data';
import { of } from 'rxjs/observable/of';
import { ServiceProvider } from '../../providers/service/service';

/**
 * Generated class for the OrderReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-review',
  templateUrl: 'order-review.html',
})
export class OrderReviewPage {

  public totalItemNumber = "0";
  public totalPrice = "0";


  public eachUser: any = {};
  public eachSupplier: any = {};
  public orderData: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loading: LoadingProvider,
    public dataProvider: DataProvider,
    public serviceProvider: ServiceProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderReviewPage');
    let param = this.navParams.get('orderData');
    this.orderData = param;
    console.log(this.orderData);
    this.serviceProvider.setNavController(this.navCtrl);
  }

  gotoHome() {
    this.navCtrl.push('HomePage');
  }

}
