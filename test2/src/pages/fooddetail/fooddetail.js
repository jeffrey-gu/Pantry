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
import { Food } from '../../providers/food';
/*
  Generated class for the Fooddetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var FooddetailPage = (function () {
    function FooddetailPage(navCtrl, navParams, foodService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.foodService = foodService;
        this.food = [];
        this.caloricBreakdown = [];
        this.nutrients = [];
        console.log(this.foodService.foodDetails);
        this.food = this.foodService.foodDetails["body"];
        if (this.food["nutrition"] === undefined) {
            console.log("No food details found");
        }
        else {
            this.caloricBreakdown = this.food["nutrition"]["caloricBreakdown"];
            this.nutrients = this.food["nutrition"]["nutrients"];
        }
        this.food["image"] = "https://spoonacular.com/cdn/ingredients_100x100/" + this.food["image"];
        console.log(this.food);
        console.log(this.nutrients);
    }
    FooddetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FooddetailPage');
    };
    return FooddetailPage;
}());
FooddetailPage = __decorate([
    Component({
        selector: 'page-fooddetail',
        templateUrl: 'fooddetail.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Food])
], FooddetailPage);
export { FooddetailPage };
//# sourceMappingURL=fooddetail.js.map