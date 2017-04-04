import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { IonPullUpFooterState} from 'ionic-pullup';
import { Food } from '../../providers/food';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    footerState: IonPullUpFooterState;

    public copyFoodthings = [];
    public selected = [];
    public anySelected : boolean = false;
    public searchQuery : string = "";

    constructor(public navCtrl: NavController, public foodService: Food) {
      this.footerState = IonPullUpFooterState.Collapsed;
      this.copyFoodthings = this.foodService.foodthings;
    }

    ionViewDidLoad(){
      this.setFilteredItems();
    }

    /******FOR FOOTER*****/
    footerExpanded() {
      console.log('Footer expanded!');
    }

    footerCollapsed() {
      console.log('Footer collapsed!');
    }

    toggleFooter() {
      this.footerState = this.footerState == IonPullUpFooterState.Collapsed ? IonPullUpFooterState.Expanded : IonPullUpFooterState.Collapsed;
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

}
