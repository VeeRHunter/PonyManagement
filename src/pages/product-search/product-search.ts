import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { LoadingProvider } from '../../providers/loading/loading';

/**
 * Generated class for the ProductSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-search',
  templateUrl: 'product-search.html',
})
export class ProductSearchPage {

  public searchPro = "";

  public eachPro: any = {};
  public productList: any[];

  public showList: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dataProvider: DataProvider,
    public loading: LoadingProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductSearchPage');
    this.getProductList();
  }

  getProductList() {
    this.dataProvider.getProductList().snapshotChanges().subscribe((result) => {
      this.showList = new Array();
      this.productList = new Array();


      this.eachPro = result.payload.val();
      for (var proKey in this.eachPro) {
        this.productList.push(this.eachPro[proKey]);
      }

      this.setShowList();

      this.loading.hide();

    });
  }

  setShowList() {
    this.showList = new Array();
    if (this.searchPro == "") {
      // for (let list of this.productList) {
      //   this.showList.push(list);
      // }
    } else {
      for (let list of this.productList) {
        if (this.compareTwoString(list.productname, this.searchPro)) {
          this.showList.push(list);
        }
      }
    }
    console.log(this.showList);
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

  filterItems(ev: any) {
    console.log(this.searchPro);
    this.setShowList();
  }

  gotoSupplierDetail(index) {
    localStorage.setItem("product", this.showList[index].product);
    console.log(this.showList[index].product);
    this.navCtrl.push('ProductDetailPage');
    // console.log(this.showList[index]);
  }

  cancel(){
    this.navCtrl.pop();
  }

  gotoHome(){
    this.navCtrl.push('HomePage');
  }

}
