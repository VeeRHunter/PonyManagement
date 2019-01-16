import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductAddPage } from './product-add';

@NgModule({
  declarations: [
    ProductAddPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductAddPage),
  ],
})
export class ProductAddPageModule {}
