import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { FoodCreatePage } from '../food-create/food-create';
import { ConfirmScannedPage } from '../confirm-scanned/confirm-scanned';
import { Food } from '../../providers/food';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FooddetailPage } from '../fooddetail/fooddetail';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  public base64Image: string;
  public selected = [];
  public anySelected : boolean = false;
  foodDetail = FooddetailPage;
  
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public foodService: Food, public http: Http) {
  }
  
 takePicture(){
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 750,
        targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
        var dataImage = JSON.stringify({image: this.base64Image});
        
        this.navCtrl.push(ConfirmScannedPage, {image: dataImage});
        //set alreadyBuffered variable
    }, (err) => {
        alert(err);
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
  goToFoodDetail(food){
      console.log(food.name);
      console.log(food.api_id);
      
      var array = JSON.stringify({data: food.api_id});
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

  deleteFood(){
    var matched : boolean = false;
    var index = 0;
    var array = [];

    for (var item in this.selected){
      while(!matched){
        if(this.selected[item].name == this.foodService.foodthings[index].name){
          matched = true;
        }
        else {
          index++;
        }
      }

      this.foodService.foodthings.splice(index, 1);
      index = 0;
      matched = false;
      array.push(this.selected[item].id);
    }

    var data = JSON.stringify({data: array});
    let headers = new Headers({
        'Content-Type': 'application/json'
      });
       let options = new RequestOptions({
         headers: headers
       });
        this.http.post('http://ec2-52-37-159-82.us-west-2.compute.amazonaws.com/api/deleteItem', data, options)
        .map(res => res.json())
      .subscribe(data => {
         console.log(data.message);
      }, error => {
          console.log("Oooops!");
      });

    this.selected = [];
    this.anySelected = false;
  }

}
