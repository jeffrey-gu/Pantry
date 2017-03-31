import { Component } from '@angular/core';
import {Http} from '@angular/http';
// import { Alert } from 'ionic-angular'
import { NavController, ModalController, Platform, NavParams, ViewController, AlertController } from 'ionic-angular';

// node-tesseract wrapper:
// import * as Tesseract from 'node-tesseract';
// import * from '@node/child_process'
// var child_process = require(child_process)


// tesseract.js
var Tesseract = require('tesseract.js')

declare function require(name:string);



@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  // Tesseract:any;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public http: Http, public alertCtrl: AlertController) {
      this.http = http;
      this.alertCtrl = alertCtrl;
  }
  openModal(){
		let modal = this.modalCtrl.create(ModalPage);
		modal.present();
  }
  sendMessage() {
        // console.log('sending message')
        // var mysql      = require('mysql');
        // var connection = mysql.createConnection({
        //     host     : '52.37.159.82:5000',
        //     user     : 'pantry',
        //     password : 'yummytummy',
        //     database : 'pantry'
        // });
        //
        // connection.connect()
        // connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
        //   if (err) throw err
        //
        //   console.log('The solution is: ', rows[0].solution)
        // })
        // connection.end()
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

  scanImage() {
      var imagePath = "../../assets/receipt_test2.jpg"

      var text = ""
    //   var alert = this.alertCtrl.create({
    //       title: "Tesseractjs Results:",
    //       subTitle: text,
    //       buttons: ["close"]
    //   });
//Tesseract.js version:
      Tesseract.recognize(imagePath)
         .progress(function  (p) { console.log('progress', p)    })
         .then((function (result) {
             console.log('result', result)
            //  var text:String = result.text.value

            //  console.log('Is String: ', text instanceof String)
             var alert = this.alertCtrl.create({
                 title: "Tesseractjs Results:",
                 subTitle: result.text,
                 buttons: ["close"]
             });
             alert.present();
            // text = result.text
            // document.getElementById("ocr-results").innerText = result.text;
        }).bind(this))

        //   alert.present()

//Tesseract/node wrapper version:
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
