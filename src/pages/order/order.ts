import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading';
import { DataProvider } from '../../providers/data/data';
import { ServiceProvider } from '../../providers/service/service';
import { ToastProvider } from '../../providers/toast/toast';
import { timestamp } from 'rxjs/operator/timestamp';

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

  public totalItemNumber = 0;
  public totalPrice = 0;


  public eachUser: any = {};
  public eachSupplier: any = {};
  public alphaBeta: any[];
  public productList: any[];

  public selSuplier: any;
  public step: string = '1';

  public commentItem: string = '';


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loading: LoadingProvider,
    public dataProvider: DataProvider,
    public service: ServiceProvider,
    public toast: ToastProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
    this.service.setNavController(this.navCtrl);
    let currentDate = new Date().toISOString();
    console.log(currentDate.split('T')[0].split('-')[2] + '/' + currentDate.split('T')[0].split('-')[1] + '/' + currentDate.split('T')[0].split('-')[0]);
    this.getProductList();
  }

  getProductList() {
    this.dataProvider.getSupplierList().snapshotChanges().subscribe((supplierList) => {
      this.eachSupplier = supplierList.payload.val();
      this.alphaBeta = new Array();
      this.productList = new Array();

      this.dataProvider.getProductList().snapshotChanges().subscribe((result) => {
        this.eachUser = result.payload.val();
        this.productList = new Array();
        this.alphaBeta = new Array();

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
              "itemnumber": 0,
              "itemprice": 0,
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
        this.loading.hide();
      });
    });
  }

  selectSup(index) {
    this.selSuplier = this.alphaBeta[index];
    this.step = '2';
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

  gotoHome() {
    this.navCtrl.setRoot('HomePage');
  }

  changeToDecimal(inputData) {
    return parseFloat(inputData).toFixed(2);
  }

  gotoPreviousPage() {
    this.navCtrl.pop();
  }

  gotoReview() {
    // this.navCtrl.push('OrderReviewPage', { orderData: this.alphaBeta });
    // this.navCtrl.push('PurchasePage');
    console.log(this.commentItem);
    if (this.totalPrice === 0) {
      this.toast.show('Please add more than one product');
    } else if (this.commentItem === '') {
      this.toast.show('Please write some message');
    } else {
      let currentDate = new Date().toISOString();
      const currentDateStr = currentDate.split('T')[0].split('-')[2] + '/' +
        currentDate.split('T')[0].split('-')[1] + '/' + currentDate.split('T')[0].split('-')[0];
      let supParam = {
        'companyname': this.selSuplier.companyname,
        'date': currentDateStr,
        'itemsnumber': this.totalItemNumber,
        'itemsprice': this.totalPrice,
        'productList': []
      }

      for (let list of this.selSuplier.productList) {
        if (list.itemnumber !== 0) {
          supParam.productList.push(list);
        }
      }

      this.service.orderHistoryAdd(supParam);
    }
  }

  increaseItem(index) {
    this.selSuplier.productList[index].itemnumber = this.selSuplier.productList[index].itemnumber + 1;
    this.getTotalPrice(index);
  }

  decreaseItem(index) {
    if (this.selSuplier.productList[index].itemnumber > 0) {
      this.selSuplier.productList[index].itemnumber = this.selSuplier.productList[index].itemnumber - 1;
      this.getTotalPrice(index);
    }
  }

  getTotalPrice(index) {
    this.getTotalItemNumber();
    this.selSuplier.productList[index].itemprice =
      this.selSuplier.productList[index].itemnumber * this.selSuplier.productList[index].price;
    this.totalPrice = 0;
    for (let list of this.selSuplier.productList) {
      let currentPrice = list.itemnumber * list.price;
      this.totalPrice = this.totalPrice + currentPrice;
    }
  }

  getTotalItemNumber() {
    this.totalItemNumber = 0;
    for (let list of this.selSuplier.productList) {
      this.totalItemNumber = this.totalItemNumber + list.itemnumber;
    }
  }

  changeNumber(index) {
    this.getTotalPrice(index);
  }

}
