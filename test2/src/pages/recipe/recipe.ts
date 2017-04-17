import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the Recipe page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html'
})
export class RecipePage {
  public instructions = []; 
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    
     this.http.get("../testrecipedetail.json").map(res => res.json()).subscribe(data => {
        this.instructions = data.steps;
        console.log(this.instructions);
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipePage');
  }
  

}
