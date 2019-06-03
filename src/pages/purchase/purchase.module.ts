import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurchasePage } from './purchase';
import { SharedModule } from '../../app/share.module';

@NgModule({
  declarations: [
    PurchasePage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(PurchasePage),
  ],
})
export class PurchasePageModule { }
