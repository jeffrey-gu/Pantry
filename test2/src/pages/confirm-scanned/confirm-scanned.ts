import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Food } from '../../providers/food';
import 'rxjs/add/operator/map';

/*
  Generated class for the ConfirmScanned page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-confirm-scanned',
  templateUrl: 'confirm-scanned.html'
})
export class ConfirmScannedPage {
	public receivedScannedItems : boolean = false;
	public scannedItems = [];
  public loader;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController,
    public foodService: Food) {
    
  	var dataImage = this.navParams.get('image');
    this.loader = this.loadingCtrl.create({
      content: "ha, now you have to wait"
    });
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({
      headers: headers
    });
    this.http.post('http://ec2-52-37-159-82.us-west-2.compute.amazonaws.com/api/receipt', dataImage, options)
    .map(res => res.json())
    .subscribe(data => {   
      this.scannedItems = data.payload;
      this.receivedScannedItems = true;
      this.loader.dismiss();
    }, (error) => {
        console.log(error);
    });
    this.loader.present();
  }

  removeRow(index){
    this.scannedItems.splice(index,1);
    console.log("Row removed");

  }

  addNewRow(){
    this.scannedItems.push("");
  }

  addFoodItem(){
    var array = JSON.stringify({userid: this.foodService.user, data: this.scannedItems});
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({
      headers: headers
    });
    this.http.post('http://ec2-52-37-159-82.us-west-2.compute.amazonaws.com/api/add', array, options)
    .map(res => res.json())
    .subscribe(data => {
      for(var i in data.message){
         this.foodService.foodthings.push(data.message[i]);
      }
      this.loader.dismiss();
      console.log(this.foodService.foodthings);
      this.http.post('http://ec2-52-37-159-82.us-west-2.compute.amazonaws.com/api/getRecipes', JSON.stringify({userid: this.foodService.user, flag: 0, data: []}), options)
        .map(res => res.json())
        .subscribe(data => {   
          this.foodService.recipes = data.message;
            this.foodService.selectedInPullup = [];
            for(var item of this.foodService.foodthings){
              item.recipeSelected = false;
            }
        }, (error) => {
            console.log("something is wrong with request", error);
        });
    }, (error) => {
        console.log(error);
    });

    this.loader.present();

    this.navCtrl.pop();
  }

  trackIndex(index, item){
    return index;
  }

}
