import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductAddedPage } from './product-added';

@NgModule({
  declarations: [
    ProductAddedPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductAddedPage),
  ],
})
export class ProductAddedPageModule {}
