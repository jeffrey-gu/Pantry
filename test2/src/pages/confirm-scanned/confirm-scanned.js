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
import { LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Food } from '../../providers/food';
import 'rxjs/add/operator/map';
/*
  Generated class for the ConfirmScanned page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var ConfirmScannedPage = (function () {
    function ConfirmScannedPage(navCtrl, navParams, http, loadingCtrl, foodService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.foodService = foodService;
        this.receivedScannedItems = false;
        this.scannedItems = [];
        var dataImage = this.navParams.get('image');
        this.loader = this.loadingCtrl.create({
            content: "ha, now you have to wait"
        });
        var headers = new Headers({
            'Content-Type': 'application/json'
        });
        var options = new RequestOptions({
            headers: headers
        });
        this.http.post('http://ec2-52-37-159-82.us-west-2.compute.amazonaws.com/api/receipt', dataImage, options)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.scannedItems = data.payload.split(',');
            alert(_this.scannedItems);
            _this.receivedScannedItems = true;
            _this.loader.dismiss();
        }, function (error) {
            console.log(error);
        });
        this.loader.present();
    }
    ConfirmScannedPage.prototype.removeRow = function (item) {
        var index = this.scannedItems.indexOf(item);
        this.scannedItems.splice(index, 1);
        console.log("Row removed");
    };
    ConfirmScannedPage.prototype.addNewRow = function () {
        alert(this.scannedItems);
        this.scannedItems.push("");
    };
    ConfirmScannedPage.prototype.addFoodItem = function () {
        var _this = this;
        var array = [];
        for (var i in this.scannedItems) {
            array.push(this.scannedItems[i].name);
        }
        var data = JSON.stringify({ data: array });
        var headers = new Headers({
            'Content-Type': 'application/json'
        });
        var options = new RequestOptions({
            headers: headers
        });
        this.http.post('http://ec2-52-37-159-82.us-west-2.compute.amazonaws.com/api/add', data, options)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            for (var i in data.message) {
                _this.foodService.foodthings.push(data.message[i]);
            }
            console.log(_this.foodService.foodthings);
        }, function (error) {
            console.log(error);
        });
        this.navCtrl.pop();
    };
    return ConfirmScannedPage;
}());
ConfirmScannedPage = __decorate([
    Component({
        selector: 'page-confirm-scanned',
        templateUrl: 'confirm-scanned.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Http, LoadingController,
        Food])
], ConfirmScannedPage);
export { ConfirmScannedPage };
//# sourceMappingURL=confirm-scanned.js.map