import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotoCropPage } from './photo-crop';
import { SharedModule } from '../../app/share.module';

import { AngularCropperjsModule } from 'angular-cropperjs';

@NgModule({
  declarations: [
    PhotoCropPage,
  ],
  imports: [
    IonicPageModule.forChild(PhotoCropPage),
    AngularCropperjsModule,
    SharedModule,
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PhotoCropPageModule { }
