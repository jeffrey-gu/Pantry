import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { Food } from '../../providers/food';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
@Component({
  selector: 'page-pantry-update',
  templateUrl: 'pantry-update.html'
})
export class PantryUpdatePage {
  public overlap = [];
  public selected = [];
  constructor(public navCtrl: NavController, public foodService: Food, public viewCtrl: ViewController, public http: Http) {
    this.overlap = this.foodService.overlapIngredients;
    console.log("--overlap--");
    console.log(this.overlap);
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PantryUpdatePage');
  }
  dismiss(){
   	this.viewCtrl.dismiss();
   }
   
   multicheckTap(food){

      //checks if item is already selected
      var index = this.selected.indexOf(food);
      if(index > -1){
        this.selected.splice(index, 1);
        food.pantrySelected = false;
      }
      else {
        this.selected.push(food);
        food.pantrySelected = true;
      }     
    

  }
    
  deleteItems(){
      var matched : boolean = false;
      var index = 0;
      var array = [];

      for (var item in this.selected){
        while(!matched){
          if(this.selected[item].name == this.foodService.foodthings[index].name){
            matched = true;
          }
          else {
            index++;
          }
        }

        this.foodService.foodthings.splice(index, 1);
        index = 0;
        matched = false;
        array.push(this.selected[item].id);
      }
      console.log(this.foodService.foodthings);
      console.log(this.selected);
      console.log(array);

      var data = JSON.stringify({userid: this.foodService.user, data: array});
      let headers = new Headers({
          'Content-Type': 'application/json'
        });
         let options = new RequestOptions({
           headers: headers
         });
          this.http.post('http://ec2-52-37-159-82.us-west-2.compute.amazonaws.com/api/deleteItem', data, options)
          .map(res => res.json())
        .subscribe(data => {
           console.log(data.message);
           this.http.post('http://ec2-52-37-159-82.us-west-2.compute.amazonaws.com/api/getRecipes', JSON.stringify({userid: this.foodService.user, flag: 0, data: []}), options)
          .map(res => res.json())
          .subscribe(data => {   
            this.foodService.recipes = data.message;
          }, (error) => {
              console.log("something is wrong with request " + error);
          });
        }, error => {
            console.log("Oooops!");
        });

        this.selected = [];
        this.viewCtrl.dismiss();
    }

}
