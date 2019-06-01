import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

  public totalItemNumber = "0";
  public totalPrice = "0";


  public eachUser: any = {};
  public eachSupplier: any = {};
  public alphaBeta: any[];
  public productList: any[];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loading: LoadingProvider,
    public dataProvider: DataProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
    this.getProductList();
  }

  getProductList() {
    this.dataProvider.getSupplierList().snapshotChanges().subscribe((supplierList) => {
      this.eachSupplier = supplierList.payload.val();
      this.alphaBeta = new Array();
      this.productList = new Array();

      console.log(this.eachSupplier);

      this.dataProvider.getProductList().snapshotChanges().subscribe((result) => {
        this.eachUser = result.payload.val();
        this.productList = new Array();
        this.alphaBeta = new Array();
        console.log(this.eachUser);

        for (var listSup in this.eachSupplier) {
          let supTemp = { "companyname": "", "productList": [], "enableShow": false };
          supTemp.companyname = this.eachSupplier[listSup].companyname;
          for (var listPro in this.eachUser) {
            let tempProductList = {
              "product": this.eachUser[listPro].product,
              "productname": this.eachUser[listPro].productname,
              "type": this.eachUser[listPro].type,
              "year": this.eachUser[listPro].year,
              "companyname": this.eachUser[listPro].companyname,
              "userId": this.eachUser[listPro].userId,
              "quantity": this.eachUser[listPro].quantity,
              "ordered": false,
              "price": this.eachUser[listPro].price,
              "itemnumber": "0",
              "itemprice": "0",
              "img": this.eachUser[listPro].img
            };
            if (this.eachSupplier[listSup].companyname == this.eachUser[listPro].companyname) {
              supTemp.productList.push(tempProductList);
            }
            this.productList.push(this.eachUser[listPro]);
          }
          if (supTemp.productList.length != 0) {
            supTemp.productList.sort(this.dynamicSort("productname"));
            supTemp.enableShow = true;
            this.alphaBeta.push(supTemp);
          }
        }
        console.log(this.productList);
        console.log(this.alphaBeta);
        this.loading.hide();
      });
    });
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

  changeItemNumber(alphaIndex, proIndex) {
    console.log(this.alphaBeta[alphaIndex].productList[proIndex]);
    let itemNum = this.alphaBeta[alphaIndex].productList[proIndex].itemnumber;
    let itemPri = this.alphaBeta[alphaIndex].productList[proIndex].price;

    if (itemNum == "") {
      this.alphaBeta[alphaIndex].productList[proIndex].itemnumber = "0";
    } else {
      this.alphaBeta[alphaIndex].productList[proIndex].itemnumber =
        parseFloat(this.alphaBeta[alphaIndex].productList[proIndex].itemnumber).toString();
    }
    this.alphaBeta[alphaIndex].productList[proIndex].itemprice =
      this.changeToDecimal(itemNum * itemPri);
    this.calculTotalPrice();
  }

  calculTotalPrice() {
    this.totalPrice = "0";
    this.totalItemNumber = "0";
    for (let list of this.alphaBeta) {
      for (let proList of list.productList) {
        console.log(proList.itemprice);
        console.log(proList.itemnumber);
        this.totalPrice = (parseFloat(this.totalPrice) + parseFloat(proList.itemprice)).toString();
        this.totalItemNumber = (parseFloat(this.totalItemNumber) + parseFloat(proList.itemnumber)).toString();
      }
    }
    this.totalPrice = this.changeToDecimal(this.totalPrice);
    this.totalItemNumber = parseFloat(this.totalItemNumber).toFixed(0);
  }

  changeToDecimal(inputData) {
    return parseFloat(inputData).toFixed(2);
  }

  gotoPreviousPage() {
    this.navCtrl.pop();
  }

  gotoReview() {
    this.navCtrl.push('OrderReviewPage', { orderData: this.alphaBeta });
  }

}
