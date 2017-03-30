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
var http_1 = require("@angular/http");
var ionic_angular_1 = require("ionic-angular");
var Tesseract = require('tesseract.js');
var ContactPage = (function () {
    function ContactPage(navCtrl, modalCtrl, http, alertCtrl) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.http = http;
        this.alertCtrl = alertCtrl;
    }
    ContactPage.prototype.openModal = function () {
        var modal = this.modalCtrl.create(ModalPage);
        modal.present();
    };
    ContactPage.prototype.sendMessage = function () {
        var _this = this;
        this.http.get('http://ec2-52-37-159-82.us-west-2.compute.amazonaws.com/api/add')
            .subscribe(function (res) {
            var alert = _this.alertCtrl.create({
                title: "Your HTTP Response:",
                subTitle: res.json().message,
                buttons: ["close"]
            });
            alert.present();
            console.log(res.json());
        }, function (err) {
            console.log(err);
        });
    };
    ContactPage.prototype.scanImage = function () {
        var imagePath = "../../assets/receipt_test2.jpg";
        Tesseract.recognize(imagePath)
            .progress(function (p) { console.log('progress', p); })
            .then(function (result) {
            console.log('result', result.text);
            var text = result.text.value;
            document.getElementById("ocr-results").innerText = result.text;
        });
    };
    return ContactPage;
}());
ContactPage = __decorate([
    core_1.Component({
        selector: 'page-contact',
        templateUrl: 'contact.html'
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController, ionic_angular_1.ModalController, http_1.Http, ionic_angular_1.AlertController])
], ContactPage);
exports.ContactPage = ContactPage;
var ModalPage = (function () {
    function ModalPage(platform, params, viewCtrl) {
        this.platform = platform;
        this.params = params;
        this.viewCtrl = viewCtrl;
    }
    ModalPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return ModalPage;
}());
ModalPage = __decorate([
    core_1.Component({
        template: "\n\n\t<ion-header>\n\t  <ion-toolbar>\n\t    <ion-title>\n\t      Modal\n\t    </ion-title>\n\t    <ion-buttons start>\n\t\t    <button ion-button (click)=\"dismiss()\">\n\t\t    \t<ion-icon name=\"md-close\"></ion-icon>\n\t\t    </button>\n\t    </ion-buttons>\n\t  </ion-toolbar>\n\t</ion-header>\n\n\t<ion-content>\n\t  <ion-item>\n\t    MODAL STUFF\n\t  </ion-item>\n\t</ion-content>\n"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.Platform,
        ionic_angular_1.NavParams,
        ionic_angular_1.ViewController])
], ModalPage);
exports.ModalPage = ModalPage;
