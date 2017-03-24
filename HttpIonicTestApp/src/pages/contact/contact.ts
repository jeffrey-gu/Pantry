import { Component } from '@angular/core';
import {Http} from '@angular/http';
import { Alert } from 'ionic-angular'

import { NavController, ModalController, Platform, NavParams, ViewController, AlertController } from 'ionic-angular';

declare function require(name:string);


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
	    this.http.get('52.37.159.82:5000/api')
	      .subscribe(res => {
              var alert = this.alertCtrl.create({
                  title: "Your IP Address",
                  subTitle: res.json().origin,
                  buttons: ["close"]
              });
              alert.present();
	      	console.log(res.json());
	      }, (err) => {
	      	console.log(err);
	      });
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
