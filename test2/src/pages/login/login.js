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
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Food } from '../../providers/food';
import { NativeStorage } from '@ionic-native/native-storage';
import 'rxjs/add/operator/map';
var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, http, foodService, nativeStorage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.foodService = foodService;
        this.nativeStorage = nativeStorage;
        this.username = "";
        this.password = "";
        this.fieldsFilled = true;
        this.correctInfo = true;
        this.validUser = true;
    }
    LoginPage.prototype.sendLogin = function () {
        var _this = this;
        if (this.username != "" && this.password != "") {
            var send = { user: this.username, password: this.password };
            var headers = new Headers({
                'Content-Type': 'application/json'
            });
            var options = new RequestOptions({
                headers: headers
            });
            this.http.post('http://ec2-52-37-159-82.us-west-2.compute.amazonaws.com/api/loguser', JSON.stringify(send), options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                if (data.success == 1) {
                    _this.foodService.user = data.userid;
                    _this.foodService.recipes = data.message2;
                    _this.foodService.foodthings = data.message;
                    console.log(data.message2);
                    _this.navCtrl.setRoot(TabsPage, {}, { animate: true, direction: 'forward' });
                    _this.nativeStorage.setItem('user', { id: data.userid, user: _this.username, pass: _this.password })
                        .then(function () { return console.log('Stored item!'); }, function (error) { return console.log('Error storing item', error); });
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
                    _this.correctInfo = false;
                }
            }, function (error) {
                console.log("something is wrong with request " + error);
            });
        }
        else {
            this.fieldsFilled = false;
        }
    };
    LoginPage.prototype.sendRegister = function () {
        var _this = this;
        if (this.username != "" && this.password != "") {
            var send = { user: this.username, password: this.password };
            var headers = new Headers({
                'Content-Type': 'application/json'
            });
            var options = new RequestOptions({
                headers: headers
            });
            this.http.post('http://ec2-52-37-159-82.us-west-2.compute.amazonaws.com/api/newuser', JSON.stringify(send), options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                if (data.success == 1) {
                    alert(data.message);
                    _this.foodService.user = data.id;
                    _this.navCtrl.setRoot(TabsPage, {}, { animate: true, direction: 'forward' });
                    _this.nativeStorage.setItem('user', { id: data.userid, user: _this.username, pass: _this.password })
                        .then(function () { return console.log('Stored item!'); }, function (error) { return console.error('Error storing item', error); });
                }
                else {
                    console.log("not success");
                    _this.validUser = false;
                }
            }, function (error) {
                console.log("something is wrong with request " + error);
            });
        }
        else {
            this.fieldsFilled = false;
        }
    };
    LoginPage.prototype.clearMessage = function () {
        this.fieldsFilled = true;
        this.correctInfo = true;
        this.validUser = true;
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Component({
        selector: 'page-login',
        templateUrl: 'login.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Http, Food,
        NativeStorage])
], LoginPage);
export { LoginPage };
//# sourceMappingURL=login.js.map