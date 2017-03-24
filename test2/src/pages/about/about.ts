import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import {Camera} from 'ionic-native';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  public base64Image: string;

  public foodthings = [{title:"pickle", selected: false},{title:"chicken", selected: false},{title:"bread", selected: false},{title:"eggs", selected: false},
    {title:"cheese", selected: false}, {title:"apple", selected: false}, {title:"pickle", selected: false},{title:"chicken", selected: false},{title:"bread", selected: false},{title:"eggs", selected: false},
    {title:"cheese", selected: false}, {title:"apple", selected: false}, {title:"pickle", selected: false},{title:"chicken", selected: false},{title:"bread", selected: false},{title:"eggs", selected: false},
    {title:"cheese", selected: false}, {title:"apple", selected: false}, {title:"pickle", selected: false},{title:"chicken", selected: false},{title:"bread", selected: false},{title:"eggs", selected: false},
    {title:"cheese", selected: false}, {title:"apple", selected: false}, {title:"pickle", selected: false},{title:"chicken", selected: false},{title:"bread", selected: false},{title:"eggs", selected: false},
    {title:"cheese", selected: false}, {title:"apple", selected: false}, {title:"pickle", selected: false},{title:"chicken", selected: false},{title:"bread", selected: false},{title:"eggs", selected: false},
    {title:"cheese", selected: false}, {title:"apple", selected: false}, {title:"pickle", selected: false},{title:"chicken", selected: false},{title:"bread", selected: false},{title:"eggs", selected: false},
    {title:"cheese", selected: false}, {title:"apple", selected: false}, {title:"pickle", selected: false},{title:"chicken", selected: false},{title:"bread", selected: false},{title:"eggs", selected: false},
    {title:"cheese", selected: false}, {title:"apple", selected: false}, {title:"pickle", selected: false},{title:"chicken", selected: false},{title:"bread", selected: false},{title:"eggs", selected: false},
    {title:"cheese", selected: false}, {title:"apple", selected: false}, {title:"pickle", selected: false},{title:"chicken", selected: false},{title:"bread", selected: false},{title:"eggs", selected: false},
    {title:"cheese", selected: false}, {title:"apple", selected: false}, {title:"pickle", selected: false},{title:"chicken", selected: false},{title:"bread", selected: false},{title:"eggs", selected: false},
    {title:"cheese", selected: false}, {title:"apple", selected: false}, {title:"pickle", selected: false},{title:"chicken", selected: false},{title:"bread", selected: false},{title:"eggs", selected: false},
    {title:"cheese", selected: false}, {title:"apple", selected: false}, {title:"pickle", selected: false},{title:"chicken", selected: false},{title:"bread", selected: false},{title:"eggs", selected: false},
    {title:"cheese", selected: false}, {title:"apple", selected: false}, {title:"pickle", selected: false},{title:"chicken", selected: false},{title:"bread", selected: false},{title:"eggs", selected: false},
    {title:"cheese", selected: false}, {title:"apple", selected: false}, {title:"pickle", selected: false},{title:"chicken", selected: false},{title:"bread", selected: false},{title:"eggs", selected: false},
    {title:"cheese", selected: false}, {title:"apple", selected: false}];
  public selected = [];
  public anySelected : boolean = false;
  
  constructor(public navCtrl: NavController) {
  }
  
 takePicture(){
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
  }

  /******FOR SELECTION MODE*****/
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
