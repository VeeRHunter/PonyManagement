import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductSearchPage } from './product-search';
import { SharedModule } from '../../app/share.module';

@NgModule({
  declarations: [
    ProductSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductSearchPage),
    SharedModule,
  ],
})
export class ProductSearchPageModule { }
