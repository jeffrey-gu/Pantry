import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  //added this
  public swipe: number = 0;
  public foodthings = [{title:"pickle", selected: false},{title:"meat", selected: false},{title:"bread", selected: false},{title:"eggs", selected: false},{title:"cheese", selected: false}];
  public selected = [];
  public anySelected : boolean = false;
  
  constructor(public navCtrl: NavController) {
  
  }
  //added this
  swipeEvent(e){
    this.swipe++;
  }

  multicheckPress(food){

    if(!this.anySelected){
      //checks if item is already selected
      var index = this.selected.indexOf(food);
      if(index > -1){
        this.selected.splice(index, 1);
        food.selected = false;
      }
      else {
        this.selected.push(food);
        food.selected = true;
      }

      //checks if any items are selected
      if(this.selected.length == 0){
        this.anySelected = false;
      }
      else {
        this.anySelected = true;
      }
    }

  }

  multicheckTap(food){

    if(this.anySelected){
      //checks if item is already selected
      var index = this.selected.indexOf(food);
      if(index > -1){
        this.selected.splice(index, 1);
        food.selected = false;
      }
      else {
        this.selected.push(food);
        food.selected = true;
      }

      //checks if any items are selected
      if(this.selected.length == 0){
        this.anySelected = false;
      }
      else {
        this.anySelected = true;
      }      
    }
    
  }

  closeSelected(){
      this.selected = [];
      this.anySelected = false;
      for (var index in this.foodthings) {
       this.foodthings[index].selected = false; 
      }
  }

}
