import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { PantryUpdatePage } from '../pantry-update/pantry-update';

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
  
  public overlapIngredients = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public foodService: Food, public modalCtrl: ModalController) {
    this.details = this.foodService.recipeDetails;
    //this.instructions = this.foodService.recipeInstructions;
    //this.instructions = this.details["analyzedInstructions"][0]["steps"];
    
    this.ingredients = this.details["extendedIngredients"];
    this.overlapIngredients = this.foodService.ingredientsHave;
    console.log(this.overlapIngredients);
      console.log("========DETAILS=========");
      console.log(this.details);
      console.log("========INSTRUCTIONS=========");
      console.log(this.foodService.recipeInstructions);
      if (this.foodService.recipeInstructions === undefined || this.foodService.recipeInstructions.length==0){
        console.log("No instructions found");
       }
      else{
       this.instructions = this.foodService.recipeInstructions[0]["steps"];
       console.log("========PARSED INSTRUCTIONS=========");
       console.log(this.instructions);
      }
  }
  openPantryUpdate(){
    let createModal = this.modalCtrl.create(PantryUpdatePage);
    createModal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipePage');
  }
  

}