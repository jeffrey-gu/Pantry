import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { PantryUpdatePage } from '../pantry-update/pantry-update';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Food } from '../../providers/food';
import { FooddetailPage } from '../fooddetail/fooddetail';
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
  public overlap = [];
  public message = [];
  foodDetail = FooddetailPage;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public foodService: Food, public modalCtrl: ModalController, public http: Http) {
    this.details = this.foodService.recipeDetails;
    //this.instructions = this.foodService.recipeInstructions;
    //this.instructions = this.details["analyzedInstructions"][0]["steps"];
    
    this.ingredients = this.details["extendedIngredients"];
    this.overlap = this.foodService.overlapIngredients;
      console.log("========DETAILS=========");
      console.log(this.details);
      console.log("========INSTRUCTIONS=========");
      console.log(this.foodService.recipeInstructions);
      console.log("========PARSED INSTRUCTIONS=========");
      if (this.foodService.recipeInstructions === undefined || this.foodService.recipeInstructions.length==0){
        console.log("No instructions found");
        this.message = [];
        this.message.push("Instructions unavailable for in-app display.  Please go to the sourceURL to view instructions.");
       }
      else{
        this.message = [];
       this.instructions = this.foodService.recipeInstructions[0]["steps"];
       console.log(this.instructions);
      }
      console.log("========OVERLAPPING INGREDIENTS=========");
      console.log(this.overlap);
  }
  openPantryUpdate(){
      var add;
            var pantry = this.foodService.foodthings;
             var ingredients = this.foodService.recipeDetails["extendedIngredients"];
             this.foodService.overlapIngredients = [];
            
             for (let food of ingredients){
               for (let item of pantry){
                 if ((food.name.search(item.name) != -1) || (item.name.search(food.name) != -1)){
                  if (this.foodService.overlapIngredients.length == 0){
                      this.foodService.overlapIngredients.push(item);
                      console.log(item.name);
                  }
                  else{
                    for (let x of this.foodService.overlapIngredients){
                      if (!(x.name === item.name)){
                        add = true;
                      }
                      else{
                        add = false;
                        break;
                      }  
                    }
                    if(add==true){
                      console.log("added");
                        console.log(item.name);
                        this.foodService.overlapIngredients.push(item);
                        console.log("---");
                    }
                    
                  }
                 }
               }
             }
    let createModal = this.modalCtrl.create(PantryUpdatePage);
    
    createModal.present();
  }
  goToFoodDetail(food){
    
      console.log(food.name);
      console.log(food.api_id);
      
      var array = JSON.stringify({data: [food.id, food.amount, food.unit]});
      let headers = new Headers({
          'Content-Type': 'application/json'
        });
      let options = new RequestOptions({
           headers: headers
         });
          this.http.post('http://ec2-52-37-159-82.us-west-2.compute.amazonaws.com/api/foodDetail', array, options)
          .map(res => res.json())
        .subscribe(data => {
          console.log(data);
            this.foodService.foodDetails=data.detail;
            console.log("food id sent to server");
            this.navCtrl.push(this.foodDetail);
      
        }, error => {
            console.log("Oooops!");
      });
    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipePage');
  }

}