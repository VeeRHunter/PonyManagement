import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { LoadingProvider } from '../../providers/loading/loading';

/**
 * Generated class for the ProductListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {

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
    console.log('ionViewDidLoad ProductListPage');
    this.getProductList();
  }

  getProductList() {
    this.loading.show();
    this.dataProvider.getSupplierList().snapshotChanges().subscribe((supplierList) => {
      this.eachSupplier = supplierList.payload.val();
      this.alphaBeta = new Array();
      this.productList = new Array();

      this.dataProvider.getProductList().snapshotChanges().subscribe((result) => {
        this.eachUser = result.payload.val();
        this.productList = new Array();
        this.alphaBeta = new Array();

        for (var listSup in this.eachSupplier) {
          let supTemp = { "companyname": "", "productList": [] };
          supTemp.companyname = this.eachSupplier[listSup].companyname;
          for (var listPro in this.eachUser) {
            if (this.eachSupplier[listSup].companyname == this.eachUser[listPro].companyname) {
              supTemp.productList.push(this.eachUser[listPro]);
            }
            this.productList.push(this.eachUser[listPro]);
          }
          if (supTemp.productList.length != 0) {
            supTemp.productList.sort(this.dynamicSort("productname"));
            this.alphaBeta.push(supTemp);
          }
        }
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

  gotoSupplierDetail(alphaIndex, proIndex) {
    localStorage.setItem("product", this.alphaBeta[alphaIndex].productList[proIndex].product);
    console.log(this.alphaBeta[alphaIndex].productList[proIndex].product);
    this.navCtrl.push('ProductDetailPage');
  }

}
