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
import { NavController, Platform } from 'ionic-angular';
import { IonPullUpFooterState } from 'ionic-pullup';
import { Food } from '../../providers/food';
import { RecipePage } from '../recipe/recipe';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
var HomePage = (function () {
    function HomePage(navCtrl, foodService, http, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.foodService = foodService;
        this.http = http;
        this.platform = platform;
        this.recipeView = "default";
        this.copyFoodthings = [];
        this.selected = [];
        this.anySelected = false;
        this.anyRecipes = false;
        this.searchQuery = "";
        this.recipes = [];
        this.recipeDetail = RecipePage;
        this.footerState = IonPullUpFooterState.Collapsed;
        //this.nav = nav;
        this.http.get('http://ec2-52-37-159-82.us-west-2.compute.amazonaws.com/api/loguser')
            .map(function (res) { return res.json(); }).subscribe(function (data) {
            _this.recipes = data.message2;
            console.log("recipes read!");
        });
        /*
              this.http.get("../testrecipes.json").map(res => res.json()).subscribe(data => {
                this.recipes = data;});
              */
    }
    HomePage.prototype.goToRecipeDetail = function () {
        //this.nav.push(RecipeDetail);
    };
    HomePage.prototype.ionViewDidLoad = function () {
        this.setFilteredItems();
        console.log(this.foodService.foodthings);
    };
    /******FOR FOOTER*****/
    HomePage.prototype.footerExpanded = function () {
        console.log('Footer expanded!');
        this.copyFoodthings = this.foodService.foodthings;
    };
    HomePage.prototype.footerCollapsed = function () {
        console.log('Footer collapsed!');
    };
    HomePage.prototype.toggleFooter = function () {
        this.footerState = this.footerState == IonPullUpFooterState.Collapsed ? IonPullUpFooterState.Expanded : IonPullUpFooterState.Collapsed;
    };
    /******FOR RECIPE VIEW******/
    HomePage.prototype.generateRecipes = function () {
        //make a GET request to populate recipes array
    };
    /******FOR SELECTION MODE*****/
    HomePage.prototype.multicheckTap = function (food) {
        //checks if item is already selected
        var index = this.selected.indexOf(food);
        if (index > -1) {
            this.selected.splice(index, 1);
            food.recipeSelected = false;
        }
        else {
            this.selected.push(food);
            food.recipeSelected = true;
        }
        //checks if any items are selected
        if (this.selected.length == 0) {
            this.anySelected = false;
        }
        else {
            this.anySelected = true;
        }
        this.foodService.foodthings = this.copyFoodthings;
    };
    HomePage.prototype.unselectAll = function () {
        for (var _i = 0, _a = this.copyFoodthings; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.recipeSelected) {
                item.recipeSelected = false;
            }
        }
        this.selected = [];
        this.anySelected = false;
        console.log("Unselecting all");
        this.foodService.foodthings = this.copyFoodthings;
    };
    /******FOR FILTERING*****/
    HomePage.prototype.checkIfEmpty = function () {
        if (this.searchQuery == "") {
            this.copyFoodthings = this.foodService.foodthings;
        }
    };
    HomePage.prototype.setFilteredItems = function () {
        console.log("searching");
        this.copyFoodthings = this.foodService.filterItems(this.searchQuery);
    };
    HomePage.prototype.echo = function (recipe) {
        console.log("echoooooooooooooo");
        console.log(recipe.name);
        console.log(recipe.id);
        var array = JSON.stringify({ data: recipe.id });
        var headers = new Headers({
            'Content-Type': 'application/json'
        });
        var options = new RequestOptions({
            headers: headers
        });
        this.http.post('http://ec2-52-37-159-82.us-west-2.compute.amazonaws.com/api/recipeDetail', array, options)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            console.log(data.json().message);
        }, function (error) {
            console.log("Oooops!");
        });
    };
    return HomePage;
}());
HomePage = __decorate([
    Component({
        selector: 'page-home',
        templateUrl: 'home.html'
    }),
    __metadata("design:paramtypes", [NavController, Food, Http, Platform])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.js.map