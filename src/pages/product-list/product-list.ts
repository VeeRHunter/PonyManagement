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
  
  public searchPro = '';
  public showList: any[];

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
            if (this.eachSupplier[listSup].companyname == this.eachUser[listPro].companyname) {
              supTemp.productList.push(this.eachUser[listPro]);
            }
            this.productList.push(this.eachUser[listPro]);
          }
          if (supTemp.productList.length != 0) {
            supTemp.productList.sort(this.dynamicSort("productname"));
            supTemp.enableShow = true;
            this.alphaBeta.push(supTemp);
          }
        }
        console.log(this.alphaBeta);
        this.setShowList();
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
    localStorage.setItem("product", this.showList[alphaIndex].productList[proIndex].product);
    console.log(this.showList[alphaIndex].productList[proIndex].product);
    this.navCtrl.push('ProductDetailPage');
  }

  gotoHome() {
    this.navCtrl.push('HomePage');
  }

  filterItems(ev: any) {
    console.log(this.searchPro);
    this.setShowList();
  }

  setShowList() {
    this.showList = new Array();
    if (this.searchPro == "") {
      for (let list of this.alphaBeta) {
        this.showList.push(list);
      }
    } else {
      for (let list of this.alphaBeta) {
        if (list.enableShow) {
          let enablePush = false;
          const temSupList = [
          ];
          for (let supList of list.productList) {
            if (this.compareTwoString(supList.productname, this.searchPro)) {
              enablePush = true;
              let temm = {
                'companyname': supList.companyname,
                'img': supList.img,
                'price': supList.price,
                'product': supList.product,
                'productname': supList.productname,
                'quantity': supList.quantity,
                'type': supList.type,
                'userId': supList.userId
              };
              temSupList.push(temm);
            }
          }
          if (enablePush) {
            let tempBeta = { "companyname": list.companyname, "productList": temSupList, "enableShow": list.enableShow };
            this.showList.push(tempBeta);
          }
        }
      }
    }
  }

  compareTwoString(str1, str2) {
    let compareState = true;
    for (let i = 0; i < str2.length; i++) {
      if (i < str1.length - 1) {
        if (str1.charAt(i).toLowerCase() == str2.charAt(i).toLowerCase()) {
        } else {
          compareState = false;
        }
      }
    }
    return compareState;
  }

}
