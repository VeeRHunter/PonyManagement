import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { LoadingProvider } from '../../providers/loading/loading';

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

  public searchPro = '';
  public showList: any[];

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
    public loading: LoadingProvider,
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
      let tempBeta = { "order": "", "supList": [], "enableShow": false };
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
        list.supList = new Array();
        for (let listArray of this.supplierList) {
          let firstLetter = listArray.companyname.charAt(0).toLowerCase();
          if (list.order.toLowerCase() == firstLetter) {
            list.supList.push(listArray);
          }
        }
        if (list.supList.length != 0) {
          list.enableShow = true;
        }
        // if (list.order.toLowerCase() == )
      }
      this.loading.hide();
      console.log(this.alphaBeta);
      this.setShowList();
    });
  }

  gotoSupplierDetail(alphaIndex, supIndex) {
    console.log(this.supplierList[supIndex]);
    localStorage.setItem('companyName', this.showList[alphaIndex].supList[supIndex].companyname)
    this.navCtrl.push('SupplierDetailPage');
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
          for (let supList of list.supList) {
            if (this.compareTwoString(supList.companyname, this.searchPro)) {
              enablePush = true;
              let temm = {
                'companyname': supList.companyname,
                'img': supList.img,
                'name': supList.name,
                'phonenumber': supList.phonenumber,
                'surname': supList.surname,
                'userId': supList.userId
              };
              temSupList.push(temm);
            }
          }
          if (enablePush) {
            let tempBeta = { "order": list.order, "supList": temSupList, "enableShow": list.enableShow };
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
