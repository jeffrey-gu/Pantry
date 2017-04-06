import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Food provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Food {

	public foodthings = [];
	
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
