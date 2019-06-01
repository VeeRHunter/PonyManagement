import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderReviewPage } from './order-review';
import { SharedModule } from '../../app/share.module';

@NgModule({
  declarations: [
    OrderReviewPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderReviewPage),
    SharedModule,
  ],
})
export class OrderReviewPageModule { }
