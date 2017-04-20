"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ionic_angular_1 = require("ionic-angular");
var AboutPage = (function () {
    function AboutPage(navCtrl) {
        this.navCtrl = navCtrl;
        this.swipe = 0;
        this.foodthings = [{ title: "pickle", selected: false }, { title: "meat", selected: false }, { title: "bread", selected: false }, { title: "eggs", selected: false }, { title: "cheese", selected: false }];
        this.selected = [];
        this.anySelected = false;
    }
    AboutPage.prototype.swipeEvent = function (e) {
        this.swipe++;
    };
    AboutPage.prototype.multicheckPress = function (food) {
        if (!this.anySelected) {
            var index = this.selected.indexOf(food);
            if (index > -1) {
                this.selected.splice(index, 1);
                food.selected = false;
            }
            else {
                this.selected.push(food);
                food.selected = true;
            }
            if (this.selected.length == 0) {
                this.anySelected = false;
            }
            else {
                this.anySelected = true;
            }
        }
    };
    AboutPage.prototype.multicheckTap = function (food) {
        if (this.anySelected) {
            var index = this.selected.indexOf(food);
            if (index > -1) {
                this.selected.splice(index, 1);
                food.selected = false;
            }
            else {
                this.selected.push(food);
                food.selected = true;
            }
            if (this.selected.length == 0) {
                this.anySelected = false;
            }
            else {
                this.anySelected = true;
            }
        }
    };
    AboutPage.prototype.closeSelected = function () {
        this.selected = [];
        this.anySelected = false;
        for (var index in this.foodthings) {
            this.foodthings[index].selected = false;
        }
    };
    return AboutPage;
}());
AboutPage = __decorate([
    core_1.Component({
        selector: 'page-about',
        templateUrl: 'about.html',
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController])
], AboutPage);
exports.AboutPage = AboutPage;
