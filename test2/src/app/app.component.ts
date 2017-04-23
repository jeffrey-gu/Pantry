import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Food } from '../providers/food';
import 'rxjs/add/operator/map';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage : any;

  constructor(platform: Platform, private splashScreen: SplashScreen, public nativeStorage: NativeStorage, public foodService: Food,
    public http: Http) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      if(this.splashScreen)
        this.splashScreen.hide();  

      this.nativeStorage.getItem('user')
      .then(
        data =>{
          this.foodService.user = data.id;

          var send = {user: data.user, password: data.pass};
          let headers = new Headers({
            'Content-Type': 'application/json'
          });
          let options = new RequestOptions({
            headers: headers
          });

          this.http.post('http://ec2-52-37-159-82.us-west-2.compute.amazonaws.com/api/loguser', JSON.stringify(send), options)
          .map(res => res.json())
          .subscribe(data => {   
            if(data.success == 1){
              this.rootPage = TabsPage;
              this.foodService.recipes = data.message2;
              this.foodService.foodthings = data.message;
              this.foodService.favoriteRecipes = data.message3;

              for (let food of this.foodService.foodthings){
                food.image_link = food.image_link.replace(" ", "");
              }

              this.nativeStorage.getItem('recentIngrdts')
              .then(
                data => {
                  this.foodService.recentlyUsed = data;
                  console.log(data);
                },
                error => console.error(error)
              );
              //GET FAVORITE RECIPES
              //this.foodService.favoriteRecipes = data.message3;
            }
            else {
              console.log("not success");
            }
          }, (error) => {
              console.log("something is wrong with request " + error);
          });
        },
        error => this.rootPage = LoginPage
      );
      
    });
  }
}
