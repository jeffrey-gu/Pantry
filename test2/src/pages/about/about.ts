import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { FoodCreatePage } from '../food-create/food-create';
import { Food } from '../../providers/food';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  public base64Image: string;
  public selected = [];
  public anySelected : boolean = false;
  
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public foodService: Food) {
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

  openFoodCreate(){
    let createModal = this.modalCtrl.create(FoodCreatePage);
    createModal.present();
  }

  /******FOR SELECTION MODE*****/
  multicheckPress(food){

    if(!this.anySelected){
      //checks if item is already selected
      var index = this.selected.indexOf(food);
      if(index > -1){
        this.selected.splice(index, 1);
        food.pantrySelected = false;
      }
      else {
        this.selected.push(food);
        food.pantrySelected = true;
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
        food.pantrySelected = false;
      }
      else {
        this.selected.push(food);
        food.pantrySelected = true;
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
    for (var index in this.foodService.foodthings) {
     this.foodService.foodthings[index].pantrySelected = false; 
    }
  }

  deleteFood(){
    var matched : boolean = false;
    var index = 0;
    for (var item in this.selected){
      while(!matched){
        if(this.selected[item].title == this.foodService.foodthings[index].title){
          matched = true;
        }
        else {
          index++;
        }
      }
      this.foodService.foodthings.splice(index, 1);
      index = 0;
      matched = false;
    }
    this.selected = [];
    this.anySelected = false;
  }

}