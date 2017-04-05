import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the Food provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Food {

	public foodthings= [];
	
	constructor() {
    interface food {
        name: string;
        imageURL: string;
        selected:  boolean;
        recipeSelected: boolean;
        pantrySelected:  boolean;
      }
      
      function pantryRequestListener () {
      this.foodthings= JSON.parse(this.responseText)['food'];
      console.log("one");
      console.log(this.foodthings[0].name);
      console.log("two");
      }
       var request = new XMLHttpRequest();
       
    request.onload = pantryRequestListener;
    request.open("get", '../testpantry.json', true);
    request.send();
		//GET REQUEST
		//this.foodthings = [{title:"pickle"},{title:"chicken"},{title:"bread"},{title:"eggs"},{title:"cheese"}];
		for(var i in this.foodthings){
      console.log(this.foodthings[i].name);
			this.foodthings[i]['recipeSelected'] = false;
			this.foodthings[i]['pantrySelected'] = false;
		}
	}

}
