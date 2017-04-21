import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Food } from '../../providers/food';

/*
  Generated class for the Fooddetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-fooddetail',
  templateUrl: 'fooddetail.html'
})
export class FooddetailPage {
  public food = [];
  public nutrients = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public foodService: Food) {
    console.log(this.foodService.foodDetails);
    this.food = this.foodService.foodDetails["body"];
    this.food["image"]= "https://spoonacular.com/cdn/ingredients_100x100/"+this.food["image"];
    this.nutrients=this.food["nutrition"]["nutrients"];
    console.log(this.food);
    console.log(this.nutrients);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FooddetailPage');
  }

}
