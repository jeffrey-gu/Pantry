import { Component } from '@angular/core';
import {Http} from '@angular/http';
// import { Alert } from 'ionic-angular'
import { NavController, ModalController, Platform, NavParams, ViewController, AlertController } from 'ionic-angular';

// node-tesseract wrapper imports:
// import * as Tesseract from 'node-tesseract';
// import * from '@node/child_process'
// var child_process = require(child_process)

// tesseract.js
var Tesseract = require('tesseract.js')
var gm = require('gm')  //graphicsMagick

declare function require(name:string);

import scanner from 'receipt-scanner'

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public http: Http, public alertCtrl: AlertController) {
      this.http = http;
      this.alertCtrl = alertCtrl;
  }
  openModal(){
		let modal = this.modalCtrl.create(ModalPage);
		modal.present();
  }

  //http requests
  sendMessage() {
	    this.http.get('http://ec2-52-37-159-82.us-west-2.compute.amazonaws.com/api/add')
	      .subscribe(res => {
              var alert = this.alertCtrl.create({
                  title: "Your HTTP Response:",
                  subTitle: res.json().message,
                  buttons: ["close"]
              });
              alert.present();
	      	console.log(res.json());
	      }, (err) => {
	      	console.log(err);
	      });
  }

//receipt scanning
  scanImage() {
      var imagePath = "../../assets/receipt_test2.jpg"

//Tesseract.js version:
      Tesseract.recognize(imagePath)
         .progress(function  (p) { console.log('progress', p)    })
         .then((function (result) {
             console.log('result', result)

             var alert = this.alertCtrl.create({
                 title: "Tesseractjs Results:",
                 subTitle: result.text,
                 buttons: ["close"]
             });
             alert.present();
        }).bind(this))

//PROBLEM CODE USING RECEIPT-SCANNER MODULE:
    //   scanner(imagePath)
    //   .parse(function (err, results) {
    //     if (err) return console.error(err)
    //     else {
    //         console.log('result', results)
    //         var alert = this.alertCtrl.create({
    //             title: "Tesseractjs Results:",
    //             subTitle: results.text,
    //             buttons: ["close"]
    //         });
    //         alert.present();
    //     }
    //   })
/////////////////////////////////////////////

//Tesseract-node wrapper version (never got this to work):
    // Tesseract.process(imagePath, function(err, text) {
    //     if(err) {
    //         console.error(err)
    //     }
    //     else {
    //         var alert = this.alertCtrl.create({
    //           title:"Your Tesseract Results:",
    //           subTitle:text,
    //           buttons:["close"]
    //         });
    //         alert.present();
    //         console.log(text);
    //     }
    // });
  }
}

/********************************************************************/

@Component({
	template: `
	<ion-header>
	  <ion-toolbar>
	    <ion-title>
	      Modal
	    </ion-title>
	    <ion-buttons start>
		    <button ion-button (click)="dismiss()">
		    	<ion-icon name="md-close"></ion-icon>
		    </button>
	    </ion-buttons>
	  </ion-toolbar>
	</ion-header>
	<ion-content>
	  <ion-item>
	    MODAL STUFF
	  </ion-item>
	</ion-content>
`
})
export class ModalPage{
	constructor(public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController){

    }
    dismiss(){
    	this.viewCtrl.dismiss();
    }
}
