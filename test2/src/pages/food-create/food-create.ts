import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the FoodCreate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'food-create.html'
})
export class FoodCreatePage {

	public foodArray = [];
	public inputList = [];

	constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
		this.inputList.push({name: "", quantity: undefined, expiry: ""});
	}

	ionViewWillEnter(){
		this.foodArray = this.navParams.get('foodArray');
	}

	dismiss(){
    	this.viewCtrl.dismiss();
    	this.inputList = [];
    }

    addNewRow(){
    	this.inputList.push({name: "", quantity: undefined, expiry: ""});
    }

    addFoodItem(){
    	for(var i in this.inputList){
    		console.log("name: " + this.inputList[i].name + " quantity: " + this.inputList[i].quantity + " expiry: " + this.inputList[i].expiry);
    		this.foodArray.push({title: this.inputList[i].name, selected: false});
    	}
    }

}
