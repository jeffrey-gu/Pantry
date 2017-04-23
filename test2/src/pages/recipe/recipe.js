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
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { PantryUpdatePage } from '../pantry-update/pantry-update';
import { Food } from '../../providers/food';
/*
  Generated class for the Recipe page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var RecipePage = (function () {
    function RecipePage(navCtrl, navParams, foodService, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.foodService = foodService;
        this.modalCtrl = modalCtrl;
        this.details = [];
        this.instructions = [];
        this.ingredients = [];
        this.overlapIngredients = [];
        this.details = this.foodService.recipeDetails;
        //this.instructions = this.foodService.recipeInstructions;
        //this.instructions = this.details["analyzedInstructions"][0]["steps"];
        this.ingredients = this.details["extendedIngredients"];
        this.overlapIngredients = this.foodService.ingredientsHave;
        console.log(this.overlapIngredients);
        console.log("========DETAILS=========");
        console.log(this.details);
        console.log("========INSTRUCTIONS=========");
        console.log(this.foodService.recipeInstructions);
        if (this.foodService.recipeInstructions === undefined || this.foodService.recipeInstructions.length == 0) {
            console.log("No instructions found");
        }
        else {
            this.instructions = this.foodService.recipeInstructions[0]["steps"];
            console.log("========PARSED INSTRUCTIONS=========");
            console.log(this.instructions);
        }
    }
    RecipePage.prototype.openPantryUpdate = function () {
        var createModal = this.modalCtrl.create(PantryUpdatePage);
        createModal.present();
    };
    RecipePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RecipePage');
    };
    return RecipePage;
}());
RecipePage = __decorate([
    Component({
        selector: 'page-recipe',
        templateUrl: 'recipe.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Food, ModalController])
], RecipePage);
export { RecipePage };
//# sourceMappingURL=recipe.js.map