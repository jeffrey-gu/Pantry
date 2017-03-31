import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { Food } from '../../providers/food';

/*
  Generated class for the FoodCreate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'food-create.html'
})
export class FoodCreatePage {

	public inputList = [];

	constructor(public navCtrl: NavController, public foodService: Food, public viewCtrl: ViewController) {
		this.inputList.push({name: "", quantity: undefined, expiry: ""});
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
  		this.foodService.foodthings.push({title: this.inputList[i].name, pantrySelected: false, recipeSelected: false});
  	}
  	this.viewCtrl.dismiss();
  }

  removeRow(item){
    var index = this.inputList.indexOf(item);
    this.inputList.splice(index,1);
    console.log("Row removed");

  }

}
