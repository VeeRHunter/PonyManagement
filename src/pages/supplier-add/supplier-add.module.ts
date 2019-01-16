import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SupplierAddPage } from './supplier-add';

@NgModule({
  declarations: [
    SupplierAddPage,
  ],
  imports: [
    IonicPageModule.forChild(SupplierAddPage),
  ],
})
export class SupplierAddPageModule {}
