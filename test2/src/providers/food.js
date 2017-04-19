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
import 'rxjs/add/operator/map';
/*
  Generated class for the Food provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var Food = (function () {
    function Food(http) {
        var _this = this;
        this.http = http;
        this.foodthings = []; //food items from pantry
        this.useInRecipe = []; //food items that are used to generate recipes, format: {name: "food"}
        this.recentlyUsed = []; //items recently used in recipes, format: {name: "food"}
        this.http.get('http://ec2-52-37-159-82.us-west-2.compute.amazonaws.com/api/loguser')
            .map(function (res) { return res.json(); }).subscribe(function (data) {
            _this.foodthings = data.message;
            console.log("pantry read!");
        });
        /*
        this.http.get("../testpantry.json").map(res => res.json()).subscribe(data => {
            this.foodthings = data.food;
            console.log(this.foodthings);
          });
  */
        //GET request to populate ingredients in pantry
        /*
        this.http.get('http://ec2-52-37-159-82.us-west-2.compute.amazonaws.com/api/fetchPantry')
        .map(res => res.json())
        .subscribe(data => {
            console.log(data.message);
          });
      */
        for (var i in this.foodthings) {
            this.foodthings[i]['recipeSelected'] = false;
            this.foodthings[i]['pantrySelected'] = false;
        }
    }
    Food.prototype.updateRecentlyUsed = function () {
        for (var _i = 0, _a = this.useInRecipe; _i < _a.length; _i++) {
            var item = _a[_i];
            this.recentlyUsed.push(item);
        }
        while (this.recentlyUsed.length > 25) {
            this.recentlyUsed.shift();
        }
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
            console.log("catergory ssort not yet!");
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
    __metadata("design:paramtypes", [Http])
], Food);
export { Food };
//# sourceMappingURL=food.js.map