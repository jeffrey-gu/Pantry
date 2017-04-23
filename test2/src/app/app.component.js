var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
var MyApp = (function () {
    function MyApp(platform, splashScreen, nativeStorage, foodService, http) {
        var _this = this;
        this.splashScreen = splashScreen;
        this.nativeStorage = nativeStorage;
        this.foodService = foodService;
        this.http = http;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            if (_this.splashScreen)
                _this.splashScreen.hide();
            _this.nativeStorage.getItem('user')
                .then(function (data) {
                _this.foodService.user = data.id;
                var send = { user: data.user, password: data.pass };
                var headers = new Headers({
                    'Content-Type': 'application/json'
                });
                var options = new RequestOptions({
                    headers: headers
                });
                _this.http.post('http://ec2-52-37-159-82.us-west-2.compute.amazonaws.com/api/loguser', JSON.stringify(send), options)
                    .map(function (res) { return res.json(); })
                    .subscribe(function (data) {
                    if (data.success == 1) {
                        _this.rootPage = TabsPage;
                        _this.foodService.recipes = data.message2;
                        _this.foodService.foodthings = data.message;
                        _this.nativeStorage.getItem('recentIngrdts')
                            .then(function (data) {
                            _this.foodService.recentlyUsed = data;
                            console.log(data);
                        }, function (error) { return console.error(error); });
                        //GET FAVORITE RECIPES
                        //this.foodService.favoriteRecipes = data.message3;
                    }
                    else {
                        console.log("not success");
                    }
                }, function (error) {
                    console.log("something is wrong with request " + error);
                });
            }, function (error) { return _this.rootPage = LoginPage; });
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Component({
        templateUrl: 'app.html'
    }),
    __metadata("design:paramtypes", [Platform, SplashScreen, NativeStorage, Food,
        Http])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map