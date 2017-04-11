import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { IonPullUpFooterState} from 'ionic-pullup';
import { Food } from '../../providers/food';
import { Http } from '@angular/http';
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

    constructor(public navCtrl: NavController, public foodService: Food, public http: Http, public platform: Platform) {
      this.footerState = IonPullUpFooterState.Collapsed;
      

      this.http.get("../testrecipes.json").map(res => res.json()).subscribe(data => {
        this.recipes = data;});
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
    }

    toggleFooter() {
      this.footerState = this.footerState == IonPullUpFooterState.Collapsed ? IonPullUpFooterState.Expanded : IonPullUpFooterState.Collapsed;
    }

    /******FOR RECIPE VIEW******/
    
    generateRecipes(){
      //make a GET request to populate recipes array

      
    }

    /******FOR SELECTION MODE*****/
    multicheckTap(food){
      //checks if item is already selected
      var index = this.selected.indexOf(food);
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
    
    echo(){
      console.log("echoooooooooooooo");
    }

}
