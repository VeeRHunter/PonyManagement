import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


import { AngularCropperjsComponent } from 'angular-cropperjs';

/**
 * Generated class for the PhotoCropPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-photo-crop',
  templateUrl: 'photo-crop.html',
})
export class PhotoCropPage {

  @ViewChild('angularCropper') public angularCropper: AngularCropperjsComponent;
  cropperOptions: any;
  croppedImage = null;

  public strValue = 0;

  myImage = null;
  scaleValX = 1;
  scaleValY = 1;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
  ) {

    this.myImage = this.navParams.get('photo');
    console.log(this.myImage);

    this.cropperOptions = {
      dragMode: 'move',
      aspectRatio: 1,
      autoCrop: true,
      movable: true,
      zoomable: true,
      scalable: true,
      zoomOnTouch: true,
      autoCropArea: 0.6,
      minCanvasWidth: 300,
      minCanvasHeight: 300,
      minCropBoxWidth: 200,
      minCropBoxHeight: 200,
      cropBoxMovable: false,
      cropBoxResizable: false,
    };
    // this.angularCropper.cropper.setCropBoxData()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotoCropPage');
  }

  done() {
    let croppedImgB64String: string = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg', (100 / 100));
    this.croppedImage = croppedImgB64String;
    this.viewCtrl.dismiss(this.croppedImage);
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  strightenMouseUp(strightenValue) {
    console.log(strightenValue);
    this.angularCropper.cropper.rotateTo(strightenValue);
  }

  strightenMouseDown() {
    console.log('Strighten MouseDown');
  }

  reset() {
    this.strValue = 0;
    this.angularCropper.cropper.reset();
  }

  flipX() {
    this.scaleValX = this.scaleValX * -1;
    this.angularCropper.cropper.scaleX(this.scaleValX);
  }

  flipY() {
    this.scaleValY = this.scaleValY * -1;
    this.angularCropper.cropper.scaleY(this.scaleValY);
  }

}
