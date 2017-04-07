import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { Food } from '../../providers/food';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

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

	constructor(public navCtrl: NavController, public foodService: Food, public viewCtrl: ViewController, public http: Http) {
		this.inputList.push({name: ""});
	}

	dismiss(){
    	this.viewCtrl.dismiss();
    	this.inputList = [];
    }

  addNewRow(){
  	this.inputList.push({name: ""});
  }

  addFoodItem(){
  	for(var i in this.inputList){
  		console.log("name: " + this.inputList[i].name);
  		this.foodService.foodthings.push({name: this.inputList[i].name, pantrySelected: false, recipeSelected: false});
  	}

    alert(this.inputList);
    var array = JSON.stringify({data: 'message'});
      let headers = new Headers({
          'Content-Type': 'application/json'
        });
         let options = new RequestOptions({
           headers: headers
         });
          this.http.post('http://ec2-52-37-159-82.us-west-2.compute.amazonaws.com/api/addItem', array, options)
          .map(res => res.json())
        .subscribe(data => {
           alert(data.json().message);
        }, error => {
            console.log("Oooops!");
        });

  	this.viewCtrl.dismiss();
  }

  removeRow(item){
    var index = this.inputList.indexOf(item);
    this.inputList.splice(index,1);
    console.log("Row removed");

  }

}
