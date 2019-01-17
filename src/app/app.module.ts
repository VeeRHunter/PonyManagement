import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { WelcomePage } from '../pages/welcome/welcome';
import { Camera } from '@ionic-native/camera';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { AngularCropperjsModule } from 'angular-cropperjs';
// import { PhotoCropPage } from '../pages/photo-crop/photo-crop';
import { SharedModule } from './share.module';
import { AuthProvider } from '../providers/auth/auth';
import { LoadingProvider } from '../providers/loading/loading';
import { ToastProvider } from '../providers/toast/toast';
import { HttpClientModule } from '@angular/common/http';


import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FirebaseProvider } from '../providers/firebase/firebase';



const firebaseConfig = {
  apiKey: "AIzaSyDx2wfNvuQPTNDIqKKvyKBqP-bLrr0JdaY",
  authDomain: "ponymanagement-80b73.firebaseapp.com",
  databaseURL: "https://ponymanagement-80b73.firebaseio.com",
  projectId: "ponymanagement-80b73",
  storageBucket: "ponymanagement-80b73.appspot.com",
  messagingSenderId: "575828568563"
};


firebase.initializeApp(firebaseConfig);


@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    // PhotoCropPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    BrowserAnimationsModule,
    // AngularCropperjsModule,
    SharedModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    // PhotoCropPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    LoadingProvider,
    ToastProvider,
    FirebaseProvider
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
