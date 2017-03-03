import { Component } from '@angular/core';

import { NavController, ModalController, Platform, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

  }
  openModal(){
		let modal = this.modalCtrl.create(ModalPage);
		modal.present();
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
