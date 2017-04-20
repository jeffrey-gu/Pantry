import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { Food } from '../../providers/food';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
@Component({
  selector: 'page-pantry-update',
  templateUrl: 'pantry-update.html'
})
export class PantryUpdatePage {

  constructor(public navCtrl: NavController, public foodService: Food, public viewCtrl: ViewController, public http: Http) {
		
	}
  dismiss(){
    	this.viewCtrl.dismiss();
    }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PantryUpdatePage');
  }

}
