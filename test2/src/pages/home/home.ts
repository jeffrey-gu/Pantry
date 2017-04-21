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
    public selected = [];
    public anySelected : boolean = false;
    public anyRecipes : boolean = false;
    public searchQuery : string = "";
    public recipes = [];
    public isLoggedIn : boolean = false;
    recipeDetail = RecipePage;
    

    constructor(public navCtrl: NavController, public foodService: Food, public http: Http, public platform: Platform) {
      this.footerState = IonPullUpFooterState.Collapsed;
      
      //uses all the ingredients from the database to generate a recipe
      // this.http.get('http://ec2-52-37-159-82.us-west-2.compute.amazonaws.com/api/loguser')
      // .map(res => res.json()).subscribe(data => {
      //   this.foodService.recipes=data.message2;
      //   console.log("recipes read!");
      //   this.isLoggedIn = true;
      // });
/*
      this.http.get("../testrecipes.json").map(res => res.json()).subscribe(data => {
        this.foodService.recipes = data;});
      */
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
            this.foodService.recipeDetails=data.package1;
            this.foodService.recipeInstructions=data.package2;
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
      if(this.selected.length > 0){
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
      console.log(this.selected);
      let headers = new Headers({
          'Content-Type': 'application/json'
      });
      let options = new RequestOptions({
        headers: headers
      });

      if(flag == 1){
        var array = [];
        for(var item of this.selected){
          array.push(item.id);
        }

        var data = {flag: flag, data: array};

        //if flag is 1, then get recipes for selected ingredients
        this.http.post('http://ec2-52-37-159-82.us-west-2.compute.amazonaws.com/api/getRecipes', JSON.stringify(data), options)
        .map(res => res.json())
        .subscribe(data => {   
          this.foodService.recipes = data.message;
          console.log("response for recipes with selected");
          console.log(data.message);
        }, (error) => {
            console.log("something is wrong with request " + error);
        });
      }
      else {
        var data = {flag: flag, data: []};
        this.http.post('http://ec2-52-37-159-82.us-west-2.compute.amazonaws.com/api/getRecipes', JSON.stringify(data), options)
        .map(res => res.json())
        .subscribe(data => {   
          this.foodService.recipes = data.message;
          console.log("response for recipes with all");
          console.log(data.message);
        }, (error) => {
            console.log("something is wrong with request " + error);
        });
      }
    }

    /******FOR SELECTION MODE*****/
    multicheckTap(food){
      //checks if item is already selected
      var index = this.selected.indexOf(food);
      console.log("selected " + this.selected);
      if(index > -1){
        this.selected.splice(index, 1);
        food.recipeSelected = false;
      }
      else {
        this.selected.push(food);
        food.recipeSelected = true;
      }

      //checks if any items are selected
      if(this.selected.length == 0){
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
      this.selected = [];
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
    
    fav = false;
    favorite(){
      this.fav=!this.fav;
    }
}
