import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductAddPage } from './product-add';
import { SharedModule } from '../../app/share.module';

@NgModule({
  declarations: [
    ProductAddPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductAddPage),
    SharedModule,
  ],
})
export class ProductAddPageModule { }
