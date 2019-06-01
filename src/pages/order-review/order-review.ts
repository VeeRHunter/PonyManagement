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
  public alphaBeta: any[];

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
    this.serviceProvider.setNavController(this.navCtrl);
    this.getProductList();
  }

  getProductList() {
    this.alphaBeta = new Array();
    let param = this.navParams.get('orderData');

    for (let list of param) {
      let supTemp = { "companyname": "", "productList": [], "enableShow": false };
      supTemp.companyname = list.companyname;
      for (let listPro of list.productList) {
        let tempProductList = {
          "product": listPro.product,
          "productname": listPro.productname,
          "type": listPro.type,
          "year": listPro.year,
          "companyname": listPro.companyname,
          "userId": listPro.userId,
          "quantity": listPro.quantity,
          "ordered": false,
          "price": listPro.price,
          "itemnumber": listPro.itemnumber,
          "itemprice": listPro.itemprice,
          "img": listPro.img
        };
        if (list.companyname == listPro.companyname && listPro.itemnumber != "0") {
          supTemp.productList.push(tempProductList);
        }
      }
      if (supTemp.productList.length != 0) {
        supTemp.productList.sort(this.dynamicSort("productname"));
        supTemp.enableShow = true;
        this.alphaBeta.push(supTemp);
      }
      console.log(this.alphaBeta);
    }
  }

  dynamicSort(property) {
    var sortOrder = 1;

    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }

    return function (a, b) {
      if (sortOrder == -1) {
        return b[property].localeCompare(a[property]);
      } else {
        return a[property].localeCompare(b[property]);
      }
    }
  }

  calculTotalPrice() {
    this.totalPrice = "0";
    this.totalItemNumber = "0";
    for (let list of this.alphaBeta) {
      for (let proList of list.productList) {
        if (proList.ordered) {
          this.totalPrice = (parseFloat(this.totalPrice) + parseFloat(proList.itemprice)).toString();
          this.totalItemNumber = (parseFloat(this.totalItemNumber) + parseFloat(proList.itemnumber)).toString();
        }
      }
    }
    this.totalPrice = this.changeToDecimal(this.totalPrice);
    this.totalItemNumber = parseFloat(this.totalItemNumber).toFixed(0);
  }

  checkOrderState(alphaIndex, proIndex) {
    this.calculTotalPrice();
  }

  changeToDecimal(inputData) {
    return parseFloat(inputData).toFixed(2);
  }

  orderProduct() {
    if (this.totalPrice != "0") {
      let orderList = new Array();
      for (let list of this.alphaBeta) {
        for (let listPro of list.productList) {
          if (listPro.ordered) {
            orderList.push(listPro);
          }
        }
      }
      this.serviceProvider.orderProduct(orderList);
    }
  }

  gotoPreviousPage() {
    this.navCtrl.pop();
  }

  gotoHome() {
    this.navCtrl.push('HomePage');
  }

}
