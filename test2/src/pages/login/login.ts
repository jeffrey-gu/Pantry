import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Food } from '../../providers/food';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
	username : string = "";
	password : string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public foodService: Food) {

  }

  sendLogin(){
  	var send = {user: this.username, password: this.password};
  	let headers = new Headers({
  		'Content-Type': 'application/json'
  	});
  	let options = new RequestOptions({
    	headers: headers
  	});
  	this.http.post('http://ec2-52-37-159-82.us-west-2.compute.amazonaws.com/api/loguser', JSON.stringify(send), options)
    .map(res => res.json())
    .subscribe(data => {   
      if(data.success == 1){
        this.foodService.user = data.userid;
      	this.foodService.recipes = data.message2;
      	this.foodService.foodthings = data.message;
      	console.log(data.message2);
      	this.navCtrl.setRoot(TabsPage, {}, {animate: true, direction: 'forward'});
      }
      else {
      	console.log("not success");
      }
    }, (error) => {
        console.log("something is wrong with request " + error);
    });
  }
  

}
