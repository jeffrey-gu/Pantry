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
    var array = [];
    for(var i in this.inputList){
      array.push(this.inputList[i].name);
    }
    
    console.log(JSON.stringify({data: array}));
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({
      headers: headers
    });
    this.http.post('http://ec2-52-37-159-82.us-west-2.compute.amazonaws.com/api/add', JSON.stringify({data: array}), options)
    .map(res => res.json())
    .subscribe(data => {
      if(data.message.length > 0){
        for(var i in data.message){
          this.foodService.foodthings.push(data.message[i]);
        }
      }
      else {
        alert("Item(s) already in pantry");
      }
      
      console.log(this.foodService.foodthings);
    }, (error) => {
        console.log(error);
    });

  	this.viewCtrl.dismiss();
  }

  removeRow(item){
    var index = this.inputList.indexOf(item);
    this.inputList.splice(index,1);
    console.log("Row removed");

  }

}
