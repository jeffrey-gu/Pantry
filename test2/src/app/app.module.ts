import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { FoodCreatePage } from '../pages/food-create/food-create';
import { ConfirmScannedPage } from '../pages/confirm-scanned/confirm-scanned';
import { RecipePage } from '../pages/recipe/recipe';
import { TabsPage } from '../pages/tabs/tabs';
import { Food } from '../providers/food';
import { FooddetailPage } from '../pages/fooddetail/fooddetail';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonPullupModule } from 'ionic-pullup';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    FoodCreatePage,
    FooddetailPage,
    ConfirmScannedPage,
    RecipePage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp,{tabsPlacement:'bottom'}),
    IonPullupModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    FoodCreatePage,
    FooddetailPage,
    ConfirmScannedPage,
    RecipePage,
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Food, SplashScreen],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
