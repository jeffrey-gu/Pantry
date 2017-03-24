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
var ContactPage = (function () {
    function ContactPage(navCtrl, modalCtrl) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
    }
    ContactPage.prototype.openModal = function () {
        var modal = this.modalCtrl.create(ModalPage);
        modal.present();
    };
    ContactPage.prototype.sendMessage = function () {
        console.log('sending message');
        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host: '52.37.159.82:5000',
            user: 'pantry',
            password: 'yummytummy',
            database: 'pantry'
        });
        connection.connect();
        connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
            if (err)
                throw err;
            console.log('The solution is: ', rows[0].solution);
        });
        connection.end();
    };
    return ContactPage;
}());
ContactPage = __decorate([
    core_1.Component({
        selector: 'page-contact',
        templateUrl: 'contact.html'
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController, ionic_angular_1.ModalController])
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
