var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import 'rxjs/add/operator/map';
/*
  Generated class for the Food provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var Food = (function () {
    function Food(http, nativeStorage) {
        this.http = http;
        this.nativeStorage = nativeStorage;
        this.foodthings = []; //food items from pantry, format: {name: "food"}
        this.recipes = [];
        this.recipeDetails = [];
        this.foodDetails = [];
        this.ingredientsHave = []; //ingredients in a recipe that the user has
        this.recipeInstructions = [];
        this.favoriteRecipes = [];
        this.useInRecipe = []; //food items that are used to generate recipes, format: {name: "food"}
        this.recentlyUsed = []; //items recently used in recipes, format: {name: "food"}
        this.user = ""; //user id
        for (var i in this.foodthings) {
            this.foodthings[i]['recipeSelected'] = false;
            this.foodthings[i]['pantrySelected'] = false;
        }
    }
    Food.prototype.updateRecentlyUsed = function () {
        if (this.useInRecipe.length > 0) {
            //useInRecipe after the items were deleted from the original useInRecipe
            //so doesn't include any items deleted from foodthings
            for (var _i = 0, _a = this.useInRecipe; _i < _a.length; _i++) {
                var item = _a[_i];
                this.recentlyUsed.push(item);
            }
            this.useInRecipe = [];
        }
        else {
            //removes any items from recently used that are no longer in the pantry
            for (var _b = 0, _c = this.recentlyUsed; _b < _c.length; _b++) {
                var item = _c[_b];
                var index = this.foodthings.indexOf(item);
                if (index > -1) {
                    this.recentlyUsed.splice(index, 1);
                }
            }
        }
        this.nativeStorage.setItem('recentIngrdts', this.recentlyUsed)
            .then(function () { return alert('Stored item!'); }, function (error) { return alert('Error storing item' + error); });
    };
    Food.prototype.filterItems = function (searchQuery) {
        console.log("food filtering");
        return this.foodthings.filter(function (food) {
            return food.name.indexOf(searchQuery.toLowerCase()) > -1;
        });
    };
    Food.prototype.sortPantry = function (sort) {
        console.log("boop");
        console.log(sort);
        if (sort == "alphabetical") {
            this.foodthings = this.foodthings.sort(function (n1, n2) {
                if (n1.name > n2.name) {
                    return 1;
                }
                if (n1.name < n2.name) {
                    return -1;
                }
                return 0;
            });
        }
        else if (sort == "category") {
            this.foodthings = this.foodthings.sort(function (n1, n2) {
                if (n1.attr1 > n2.attr1) {
                    return 1;
                }
                else if (n1.attr1 < n2.attr1) {
                    return -1;
                }
                else if (n1.attr1 == n2.attr1) {
                    if (n1.attr2 > n2.attr2) {
                        return 1;
                    }
                    else if (n1.attr2 < n2.attr2) {
                        return -1;
                    }
                }
                else {
                    return 0;
                }
            });
        }
        else if (sort == "recent") {
            console.log("recent sort not yet done!");
        }
        else {
            console.log("lol how did you get here");
        }
        for (var i in this.foodthings) {
            console.log(this.foodthings[i].name);
        }
        console.log("done sorting!  Enjoy your life!");
    };
    return Food;
}());
Food = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, NativeStorage])
], Food);
export { Food };
//# sourceMappingURL=food.js.map