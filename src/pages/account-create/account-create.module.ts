import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountCreatePage } from './account-create';

@NgModule({
  declarations: [
    AccountCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(AccountCreatePage),
  ],
})
export class AccountCreatePageModule {}
