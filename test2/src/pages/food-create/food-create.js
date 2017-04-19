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
import { NavController, ViewController } from 'ionic-angular';
import { Food } from '../../providers/food';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the FoodCreate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var FoodCreatePage = (function () {
    function FoodCreatePage(navCtrl, foodService, viewCtrl, http) {
        this.navCtrl = navCtrl;
        this.foodService = foodService;
        this.viewCtrl = viewCtrl;
        this.http = http;
        this.inputList = [];
        this.inputList.push({ name: "" });
    }
    FoodCreatePage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
        this.inputList = [];
    };
    FoodCreatePage.prototype.addNewRow = function () {
        this.inputList.push({ name: "" });
    };
    FoodCreatePage.prototype.addFoodItem = function () {
        var _this = this;
        var array = [];
        for (var i in this.inputList) {
            array.push(this.inputList[i].name);
        }
        console.log(JSON.stringify({ data: array }));
        var headers = new Headers({
            'Content-Type': 'application/json'
        });
        var options = new RequestOptions({
            headers: headers
        });
        this.http.post('http://ec2-52-37-159-82.us-west-2.compute.amazonaws.com/api/add', JSON.stringify({ data: array }), options)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            for (var i in data.message) {
                _this.foodService.foodthings.push(data.message[i]);
            }
            console.log(_this.foodService.foodthings);
        }, function (error) {
            console.log(error);
        });
        this.viewCtrl.dismiss();
    };
    FoodCreatePage.prototype.removeRow = function (item) {
        var index = this.inputList.indexOf(item);
        this.inputList.splice(index, 1);
        console.log("Row removed");
    };
    return FoodCreatePage;
}());
FoodCreatePage = __decorate([
    Component({
        templateUrl: 'food-create.html'
    }),
    __metadata("design:paramtypes", [NavController, Food, ViewController, Http])
], FoodCreatePage);
export { FoodCreatePage };
//# sourceMappingURL=food-create.js.map