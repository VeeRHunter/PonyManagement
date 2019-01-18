import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductListPage } from './product-list';
import { SharedModule } from '../../app/share.module';

@NgModule({
  declarations: [
    ProductListPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductListPage),
    SharedModule,
  ],
})
export class ProductListPageModule { }
