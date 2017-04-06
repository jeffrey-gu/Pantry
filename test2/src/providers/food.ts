import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the Food provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Food {

	public foodthings = [];
	
	constructor() {
    interface food {
        name: string;
        imageURL: string;
        selected:  boolean;
        recipeSelected: boolean;
        pantrySelected:  boolean;
      }
      
        function pantryRequestListener () {
          this.foodthings = JSON.parse(this.responseText)['food'];
          for(var i in this.foodthings){
          console.log(this.foodthings[i].name);
        }
      }
       var request = new XMLHttpRequest();
       
    request.onload = pantryRequestListener;
    request.open("get", '../testpantry.json', true);
    request.send();
    
		for(var i in this.foodthings){
      console.log(this.foodthings[i].name);
			this.foodthings[i]['recipeSelected'] = false;
			this.foodthings[i]['pantrySelected'] = false;
		}
	}

	filterItems(searchQuery){
		console.log("food filtering");
		return this.foodthings.filter((food) => {
			return food.title.indexOf(searchQuery.toLowerCase()) > -1;
		});
	}

}
