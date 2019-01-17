import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the SupplierListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-supplier-list',
  templateUrl: 'supplier-list.html',
})
export class SupplierListPage {

  public eachUser: any = {};
  public alphaBeta: any[];
  public supplierList: any[];

  aToz = [
    'A', 'B', 'C', 'D', 'E', 'F',
    'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R',
    'S', 'T', 'U', 'V', 'W', 'X',
    'Y', 'Z'];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dataProvider: DataProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupplierListPage');
    this.setInitialAlphaBeta();
    this.getSupplierList();
  }

  setInitialAlphaBeta() {
    this.alphaBeta = new Array();
    for (let list of this.aToz) {
      let tempBeta = { "order": "", "supList": [] };
      tempBeta.order = list;
      this.alphaBeta.push(tempBeta);
    }
    console.log(this.alphaBeta);
  }

  getSupplierList() {
    this.dataProvider.getSupplierList().snapshotChanges().subscribe((supllierData) => {
      this.supplierList = new Array();
      this.eachUser = supllierData.payload.val();
      for (var key in this.eachUser) {
        this.supplierList.push(this.eachUser[key]);
      }

      for (let list of this.alphaBeta) {
        for (let listArray of this.supplierList) {
          let firstLetter = listArray.companyname.charAt(0).toLowerCase();
          if (list.order.toLowerCase() == firstLetter) {
            list.supList.push(listArray);
          }
        }
        // if (list.order.toLowerCase() == )
      }
      console.log(this.alphaBeta);
    });
  }

  gotoSupplierDetail(alphaIndex, supIndex) {
    console.log(this.alphaBeta[alphaIndex].supList[supIndex]);
    localStorage.setItem('companyName', this.alphaBeta[alphaIndex].supList[supIndex].companyname)
    this.navCtrl.push('SupplierDetailPage');
  }

}
