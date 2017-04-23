import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { IonPullUpFooterState} from 'ionic-pullup';
import { Food } from '../../providers/food';
import { RecipePage } from '../recipe/recipe';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    footerState: IonPullUpFooterState;
    recipeView: string = "default";
    public copyFoodthings = [];
    public anySelected : boolean = false;
    public anyRecipes : boolean = false;
    public searchQuery : string = "";
    public recipes = [];
    recipeDetail = RecipePage;
    

    constructor(public navCtrl: NavController, public foodService: Food, public http: Http, public platform: Platform) {
      this.footerState = IonPullUpFooterState.Collapsed;
    }

  goToRecipeDetail(recipe){
    console.log(recipe.name);
    console.log(recipe.id);
    
    var array = JSON.stringify({data: recipe.id});
    let headers = new Headers({
        'Content-Type': 'application/json'
      });
    let options = new RequestOptions({
         headers: headers
       });
        this.http.post('http://ec2-52-37-159-82.us-west-2.compute.amazonaws.com/api/recipeDetail', array, options)
        .map(res => res.json())
      .subscribe(data => {
          this.foodService.recipeDetails=JSON.parse(data.package1);
          this.foodService.recipeInstructions=JSON.parse(data.package2);
           var pantry = this.foodService.foodthings;
           var ingredients = this.foodService.recipeDetails["extendedIngredients"];
           this.foodService.overlapIngredients = [];
           
           console.log(ingredients);
           console.log(pantry);
           for (let food of ingredients){
             for (let item of pantry){
               if ((food.name.search(item.name) != -1)){
                
                 this.foodService.overlapIngredients.push(item);
                 this.foodService.haveIngredients.push(food);
                 this.foodService.dontHaveIngredients.push(food);
                 console.log(item.name);
               }
               else{
                
               }
             }
           }
           console.log(this.foodService.overlapIngredients);
          console.log("recipe id sent to server");
          this.navCtrl.push(this.recipeDetail);
      }, error => {
          console.log("Oooops!");
      });
      
    }

    ionViewDidLoad(){
      this.setFilteredItems();
      console.log(this.foodService.foodthings);
      
    }

    /******FOR FOOTER*****/
    footerExpanded() {
      console.log('Footer expanded!');
      this.copyFoodthings = this.foodService.foodthings;
    }

    footerCollapsed() {
      console.log('Footer collapsed!');
      if(this.foodService.selectedInPullup.length > 0){
        console.log("generate recipes with length");
        this.generateRecipes(1);
      }
      else {
        console.log("generate recipes no length");
        this.generateRecipes(0);
      }
    }

    toggleFooter() {
      this.footerState = this.footerState == IonPullUpFooterState.Collapsed ? IonPullUpFooterState.Expanded : IonPullUpFooterState.Collapsed;
    }

    /******FOR RECIPE VIEW******/
    
    generateRecipes(flag){
      console.log("recipes are generating");
      console.log(this.foodService.selectedInPullup);
      let headers = new Headers({
          'Content-Type': 'application/json'
      });
      let options = new RequestOptions({
        headers: headers
      });

      if(flag == 1){
        var array = [];
        for(var item of this.foodService.selectedInPullup){
          array.push(item.id);
        }

        var data = {userid: this.foodService.user, flag: flag, data: array};

        //if flag is 1, then get recipes for selected ingredients
        this.http.post('http://ec2-52-37-159-82.us-west-2.compute.amazonaws.com/api/getRecipes', JSON.stringify(data), options)
        .map(res => res.json())
        .subscribe(data => {   
          this.foodService.recipes = data.message;
          console.log("response for recipes with selected");
          console.log(data.message);
        }, (error) => {
            console.log("something is wrong with request", error);
        });
      }
      else {
        var data = {userid: this.foodService.user, flag: flag, data: []};
        this.http.post('http://ec2-52-37-159-82.us-west-2.compute.amazonaws.com/api/getRecipes', JSON.stringify(data), options)
        .map(res => res.json())
        .subscribe(data => {   
          this.foodService.recipes = data.message;
          console.log("response for recipes with all");
          console.log(data.message);
        }, (error) => {
            console.log("something is wrong with request", error);
        });
      }
    }

    /******FOR SELECTION MODE*****/
    multicheckTap(food){
      //checks if item is already selected
      var index = this.foodService.selectedInPullup.indexOf(food);
      console.log("selected " + this.foodService.selectedInPullup);
      if(index > -1){
        this.foodService.selectedInPullup.splice(index, 1);
        food.recipeSelected = false;
      }
      else {
        this.foodService.selectedInPullup.push(food);
        food.recipeSelected = true;
      }

      //checks if any items are selected
      if(this.foodService.selectedInPullup.length == 0){
        this.anySelected = false;
      }
      else {
        this.anySelected = true;
      }      
      this.foodService.foodthings = this.copyFoodthings;
    }

    unselectAll(){
      for(var item of this.copyFoodthings){
        if(item.recipeSelected){
          item.recipeSelected = false;
        }
      }
      this.foodService.selectedInPullup = [];
      this.anySelected = false;
      console.log("Unselecting all");
      this.foodService.foodthings = this.copyFoodthings;
    }

    /******FOR FILTERING*****/
    checkIfEmpty(){
      if(this.searchQuery == ""){
        this.copyFoodthings = this.foodService.foodthings;
      }
    }
    setFilteredItems(){
      console.log("searching");
      this.copyFoodthings = this.foodService.filterItems(this.searchQuery);
    }
    
    favorite(recipe){
      recipe.isFav=!recipe.isFav;
      let headers = new Headers({
          'Content-Type': 'application/json'
      });
      let options = new RequestOptions({
        headers: headers
      });
      var data = {userid: this.foodService.user, data: recipe.id};

      //if just now favorited
      if(recipe.isFav){
        console.log("favoriting");
        console.log(recipe);
        console.log(data);
        this.http.post('http://ec2-52-37-159-82.us-west-2.compute.amazonaws.com/api/favorite', JSON.stringify(data), options)
        .map(res => res.json())
        .subscribe(data => {   
          alert(data.message);
          this.foodService.favoriteRecipes.push(recipe);
        }, (error) => {
            console.log("something is wrong with request", error);
        });
      }
      else {
        console.log("unfavoriting");
        console.log(recipe);

        //looking through favorite recipes array, only looking for id
        var index = 0;
        var matched = false;
        while(!matched){
          if(recipe.id == this.foodService.favoriteRecipes[index].id){
            matched = true;
          }
          else {
            index++;
          }
        }

        console.log(index);
        if(matched){
          this.foodService.favoriteRecipes.splice(index, 1);
          console.log(this.foodService.favoriteRecipes);
          this.http.post('http://ec2-52-37-159-82.us-west-2.compute.amazonaws.com/api/unfavorite', JSON.stringify(data), options)
          .map(res => res.json())
          .subscribe(data => {   
            alert(data.message);
          }, (error) => {
              console.log("something is wrong with request", error);
          });          
        }
        else {
          console.log("can't find this favorite");
        }

      }

    }

    //ONLY USED FOR FAVORITES SEGMENT, so that the recipe won't
    //show up in the Favorites segment anymore
    removeFavorite(recipe){
      console.log("unfavoriting");
      console.log(recipe);
      
      var index = 0;
      var matched = false;
      while(!matched){
        if(recipe.id == this.foodService.favoriteRecipes[index].id){
          matched = true;
        }
        else {
          index++;
        }
      }

      if(matched){
        this.foodService.favoriteRecipes.splice(index, 1);

        let headers = new Headers({
          'Content-Type': 'application/json'
        });
        let options = new RequestOptions({
          headers: headers
        });
        var data = {userid: this.foodService.user, data: recipe.id};
        this.http.post('http://ec2-52-37-159-82.us-west-2.compute.amazonaws.com/api/unfavorite', JSON.stringify(data), options)
        .map(res => res.json())
        .subscribe(data => {   
          alert(data.message);
        }, (error) => {""
            console.log("something is wrong with request", error);
        });

      }
    }
}
