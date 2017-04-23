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
        this.isLoggedIn = false;
        this.recipeDetail = RecipePage;
        this.footerState = IonPullUpFooterState.Collapsed;
        //uses all the ingredients from the database to generate a recipe
        // this.http.get('http://ec2-52-37-159-82.us-west-2.compute.amazonaws.com/api/loguser')
        // .map(res => res.json()).subscribe(data => {
        //   this.foodService.recipes=data.message2;
        //   console.log("recipes read!");
        //   this.isLoggedIn = true;
        // });
        /*
              this.http.get("../testrecipes.json").map(res => res.json()).subscribe(data => {
                this.foodService.recipes = data;});
              */
    }
    HomePage.prototype.goToRecipeDetail = function (recipe) {
        var _this = this;
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
            _this.foodService.recipeDetails = data.package1;
            _this.foodService.recipeInstructions = data.package2;
            console.log("recipe id sent to server");
            _this.navCtrl.push(_this.recipeDetail);
        }, function (error) {
            console.log("Oooops!");
        });
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
        if (this.selected.length > 0) {
            console.log("generate recipes with length");
            this.generateRecipes(1);
        }
        else {
            console.log("generate recipes no length");
            this.generateRecipes(0);
        }
    };
    HomePage.prototype.toggleFooter = function () {
        this.footerState = this.footerState == IonPullUpFooterState.Collapsed ? IonPullUpFooterState.Expanded : IonPullUpFooterState.Collapsed;
    };
    /******FOR RECIPE VIEW******/
    HomePage.prototype.generateRecipes = function (flag) {
        var _this = this;
        console.log("recipes are generating");
        console.log(this.selected);
        var headers = new Headers({
            'Content-Type': 'application/json'
        });
        var options = new RequestOptions({
            headers: headers
        });
        if (flag == 1) {
            var array = [];
            for (var _i = 0, _a = this.selected; _i < _a.length; _i++) {
                var item = _a[_i];
                array.push(item.id);
            }
            var data = { userid: this.foodService.user, flag: flag, data: array };
            //if flag is 1, then get recipes for selected ingredients
            this.http.post('http://ec2-52-37-159-82.us-west-2.compute.amazonaws.com/api/getRecipes', JSON.stringify(data), options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.foodService.recipes = data.message;
                console.log("response for recipes with selected");
                console.log(data.message);
            }, function (error) {
                console.log("something is wrong with request " + error);
            });
        }
        else {
            var data = { userid: this.foodService.user, flag: flag, data: [] };
            this.http.post('http://ec2-52-37-159-82.us-west-2.compute.amazonaws.com/api/getRecipes', JSON.stringify(data), options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.foodService.recipes = data.message;
                console.log("response for recipes with all");
                console.log(data.message);
            }, function (error) {
                console.log("something is wrong with request " + error);
            });
        }
    };
    /******FOR SELECTION MODE*****/
    HomePage.prototype.multicheckTap = function (food) {
        //checks if item is already selected
        var index = this.selected.indexOf(food);
        console.log("selected " + this.selected);
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
    HomePage.prototype.favorite = function (recipe) {
        recipe.isFav = !recipe.isFav;
        var headers = new Headers({
            'Content-Type': 'application/json'
        });
        var options = new RequestOptions({
            headers: headers
        });
        var data = { userid: this.foodService.user, data: recipe.id };
        //if just now favorited
        if (recipe.isFav) {
            console.log("favoriting");
            console.log(recipe);
            console.log(data);
            this.http.post('http://ec2-52-37-159-82.us-west-2.compute.amazonaws.com/api/favorite', JSON.stringify(data), options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                alert(data.message);
            }, function (error) {
                console.log("something is wrong with request " + error);
            });
        }
        else {
            console.log("unfavoriting " + recipe);
            this.http.post('http://ec2-52-37-159-82.us-west-2.compute.amazonaws.com/api/unfavorite', JSON.stringify(data), options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                alert(data.message);
            }, function (error) {
                console.log("something is wrong with request " + error);
            });
        }
    };
    //ONLY USED FOR FAVORITES SEGMENT, so that the recipe won't
    //show up in the Favorites segment anymore
    HomePage.prototype.removeFavorite = function (recipe) {
        var index = this.foodService.favoriteRecipes.indexOf(recipe);
        if (index > -1) {
            this.foodService.favoriteRecipes.splice(index, 1);
            var headers = new Headers({
                'Content-Type': 'application/json'
            });
            var options = new RequestOptions({
                headers: headers
            });
            var data = { userid: this.foodService.user, data: recipe.id };
            this.http.post('http://ec2-52-37-159-82.us-west-2.compute.amazonaws.com/api/unfavorite', JSON.stringify(data), options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                alert(data.message);
            }, function (error) {
                console.log("something is wrong with request " + error);
            });
        }
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