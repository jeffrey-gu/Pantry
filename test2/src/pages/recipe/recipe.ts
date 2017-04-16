import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Food } from '../../providers/food';
/*
  Generated class for the Recipe page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html'
})
export class RecipePage {
  public details = [];
  
  public instructions = [];
  
  public ingredients = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public foodService: Food) {
    this.details = this.foodService.recipeDetails;
    //this.instructions = this.foodService.recipeInstructions;
    //this.instructions = this.details["analyzedInstructions"][0]["steps"];
    this.instructions = this.foodService.recipeInstructions[0]["steps"];
    this.ingredients = this.details["extendedIngredients"];
     
      console.log("========DETAILS=========");
     console.log(this.details);
     console.log("========INSTRUCTIONS=========");
     console.log(this.foodService.recipeInstructions);
     console.log("========INSTRUCTIONS=========");
      console.log(this.instructions);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipePage');
  }
  

}
