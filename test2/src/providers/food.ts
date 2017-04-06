import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { IonPullUpFooterState} from 'ionic-pullup';


/*
  Generated class for the Food provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Food {

	public foodthings = [];
	/*
<<<<<<< HEAD
	constructor() {
        console.log("check1");
        
      interface food {
          name: string;
          imageURL: string;
          recipeSelected: boolean;
          pantrySelected:  boolean;
        }
          console.log("check2");
          
         
          for(var i in this.foodthings){
                
                console.log(this.foodthings[i].name);
                console.log(this.foodthings[i].imageURL);
                
                this.foodthings[i]['recipeSelected'] = false;
                this.foodthings[i]['pantrySelected'] = false;
              }
          
        function pantryRequestListener () {
              console.log("Parsing!");
            this.foodthings = JSON.parse(this.responseText)['food'];
                console.log("parsed!");
              for(var i in this.foodthings){
                
                console.log(this.foodthings[i].name);
                console.log(this.foodthings[i].imageURL);
                
                this.foodthings[i]['recipeSelected'] = false;
                this.foodthings[i]['pantrySelected'] = false;
              }
                  console.log("made foodthings!");
        }
            console.log("check3");
       var request = new XMLHttpRequest();
        request.onload = pantryRequestListener;
            console.log("check4");
        request.open("get", '../testpantry.json', true);
            console.log("check5");
        request.send();
            console.log("constructor complete");
            */
	constructor(public http: Http) {
    interface food {
        name: string;
        imageURL: string;
        recipeSelected: boolean;
        pantrySelected:  boolean;
      }

      this.http.get("../testpantry.json").map(res => res.json()).subscribe(data => {
          this.foodthings = data.food;
          console.log(this.foodthings);
        });
    
		for(var i in this.foodthings){
      console.log(this.foodthings[i].name);
			this.foodthings[i]['recipeSelected'] = false;
			this.foodthings[i]['pantrySelected'] = false;
		}
	}

	filterItems(searchQuery){
		console.log("food filtering");
		return this.foodthings.filter((food) => {
			return food.name.indexOf(searchQuery.toLowerCase()) > -1;
		});
	}

}
