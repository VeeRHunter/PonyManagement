import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SupplierListPage } from './supplier-list';
import { SharedModule } from '../../app/share.module';

@NgModule({
  declarations: [
    SupplierListPage,
  ],
  imports: [
    IonicPageModule.forChild(SupplierListPage),
    SharedModule,
  ],
})
export class SupplierListPageModule { }
